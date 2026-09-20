import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { z } from 'zod';
import { Resend } from 'resend';
import { isPaymentAlreadyRecorded, appendRegistrationRow } from '@/lib/sheets';
import { generateRegistrationEmail } from './emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

const VerifySchema = z.object({
  razorpay_order_id:   z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature:  z.string().min(1),
  formData: z.object({
    fullName:    z.string().min(1).max(200),
    email:       z.string().email(),
    phone:       z.string().min(7).max(20),
    company:     z.string().max(200).optional().default(''),
    designation: z.string().max(200).optional().default(''),
  }),
  passType:  z.string().min(1),
  ticketTier: z.enum(['earlybird', 'standard', 'vip']).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = VerifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request payload', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
      passType,
    } = parsed.data;

    const isProduction = process.env.IS_PRODUCTION === 'true';
    const key_id     = isProduction ? process.env.RAZORPAY_PROD_KEY_ID     : process.env.RAZORPAY_DEV_KEY_ID;
    const key_secret = isProduction ? process.env.RAZORPAY_PROD_KEY_SECRET : process.env.RAZORPAY_DEV_KEY_SECRET;

    if (!key_secret || !key_id) {
      return NextResponse.json({ error: 'Razorpay keys not configured' }, { status: 500 });
    }

    // ── 1. Timing-safe HMAC-SHA256 signature verification ───────────────────────
    const generatedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Lengths must match before timingSafeEqual to avoid length-leak
    if (generatedSignature.length !== razorpay_signature.length) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    const isValidSignature = crypto.timingSafeEqual(
      Buffer.from(generatedSignature, 'hex'),
      Buffer.from(razorpay_signature,  'hex')
    );

    if (!isValidSignature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // ── 2. Fetch payment from Razorpay API — verify captured status ─────────────
    const instance = new Razorpay({ key_id, key_secret });
    const payment = await instance.payments.fetch(razorpay_payment_id) as any;

    if (payment.status !== 'captured') {
      return NextResponse.json(
        { error: `Payment not captured (status: ${payment.status})` },
        { status: 400 }
      );
    }

    const paidAmount = Number(payment.amount) / 100; // paisa → rupees

    // ── 3. Idempotency guard: prevent duplicate rows in Google Sheets ────────────
    const alreadyRecorded = await isPaymentAlreadyRecorded(razorpay_payment_id);
    if (alreadyRecorded) {
      // Already processed (webhook beat us, or duplicate call) — return success silently
      return NextResponse.json({ success: true, message: 'Already processed' });
    }

    // ── 4. Append registration to Google Sheets ──────────────────────────────────
    await appendRegistrationRow({
      createdAt:   new Date().toISOString(),
      paymentId:   razorpay_payment_id,
      orderId:     razorpay_order_id,
      ticketTier:  passType,
      amount:      paidAmount,
      name:        formData.fullName,
      email:       formData.email,
      phone:       formData.phone,
      company:     formData.company     || '',
      designation: formData.designation || '',
      status:      'Confirmed',
    });

    // ── 5. Send confirmation email via Resend ────────────────────────────────────
    try {
      const htmlContent = generateRegistrationEmail({
        fullName:    formData.fullName,
        email:       formData.email,
        phone:       formData.phone,
        company:     formData.company,
        designation: formData.designation,
        paymentId:   razorpay_payment_id,
        passType,
        amountPaid:  paidAmount,
      });

      const { error: emailError } = await resend.emails.send({
        from:    process.env.SEND_FROM_EMAIL || 'onboarding@resend.dev',
        to:      [formData.email],
        cc:      process.env.EMAIL_CC ? process.env.EMAIL_CC.split(',') : undefined,
        bcc:     [process.env.ADMIN_EMAIL || '', process.env.EMAIL_BCC || ''].filter(Boolean),
        subject: `Registration Confirmed – EC Summit 2027 (${passType})`,
        html:    htmlContent,
      });

      if (emailError) {
        // Log but don't fail — ticket row is already saved in Sheets
        console.error('[Resend] Email dispatch error:', emailError);
      }
    } catch (emailErr) {
      console.error('[Resend] Exception sending email:', emailErr);
    }

    return NextResponse.json({ success: true, message: 'Payment verified and registration saved' });

  } catch (error: any) {
    console.error('[Verify] Error:', error);
    // Return generic message — never leak internal stack traces
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
