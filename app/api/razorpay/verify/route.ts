import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import { generateRegistrationEmail } from './emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      formData, 
      passType, 
      amount 
    } = body;

    const isProduction = process.env.IS_PRODUCTION === 'true';
    const key_secret = isProduction ? process.env.RAZORPAY_PROD_KEY_SECRET : process.env.RAZORPAY_DEV_KEY_SECRET;

    if (!key_secret) {
      return NextResponse.json({ error: 'Razorpay secret key not configured' }, { status: 500 });
    }

    // Verify Signature
    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed: Invalid signature' }, { status: 400 });
    }

    // Payment is verified! Store details to Google Sheet without fail
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    
    if (webhookUrl && webhookUrl !== 'NIL') {
      try {
        const sheetData = {
          timestamp: new Date().toISOString(),
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          passType: passType,
          amountPaid: amount,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          designation: formData.designation,
          status: 'Confirmed'
        };

        const sheetResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sheetData)
        });

        if (!sheetResponse.ok) {
          console.error("Failed to push to Google Sheet:", await sheetResponse.text());
        }
      } catch (err) {
        console.error("Error pushing to Google Sheet webhook:", err);
      }
    } else {
      console.warn("GOOGLE_SHEET_WEBHOOK_URL is not set. Data was not saved to Google Sheets.");
    }

    // Send Email Notification using Resend
    try {
      const htmlContent = generateRegistrationEmail({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        designation: formData.designation,
        paymentId: razorpay_payment_id,
        passType: passType,
        amountPaid: amount
      });

      const { data, error } = await resend.emails.send({
        from: process.env.SEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: [formData.email],
        cc: process.env.EMAIL_CC ? process.env.EMAIL_CC.split(',') : undefined,
        bcc: [process.env.ADMIN_EMAIL || '', process.env.EMAIL_BCC || ''].filter(Boolean),
        subject: `Registration Confirmed - Millionaire Summit 2027`,
        html: htmlContent
      });

      if (error) {
        console.error('Error sending confirmation email via Resend:', error);
      } else {
        console.log('Confirmation email sent successfully via Resend:', data);
      }
    } catch (emailError) {
      console.error('Exception sending confirmation email via Resend:', emailError);
      // We don't throw an error here to prevent failing the whole checkout
    }

    return NextResponse.json({ success: true, message: 'Payment verified and data saved' });

  } catch (error: any) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong during verification' }, { status: 500 });
  }
}
