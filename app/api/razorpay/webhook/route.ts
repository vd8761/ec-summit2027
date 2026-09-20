import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { isPaymentAlreadyRecorded, appendRegistrationRow } from '@/lib/sheets';
import { dispatchTicketConfirmation } from '@/lib/mailer';

/**
 * Razorpay Webhook: /api/razorpay/webhook
 *
 * Fallback fulfillment route that runs even if the user closes their browser
 * immediately after payment. Razorpay calls this directly when payment.captured
 * fires on their side.
 *
 * Setup in Razorpay Dashboard → Webhooks:
 *   URL:    https://yourdomain.com/api/razorpay/webhook
 *   Events: payment.captured  ✓
 *   Secret: set RAZORPAY_WEBHOOK_SECRET in .env
 */
export async function POST(req: NextRequest) {
  try {
    // Raw body must be read before parsing — Razorpay signature covers exact bytes
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing webhook signature' }, { status: 400 });
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('[Webhook] RAZORPAY_WEBHOOK_SECRET is not configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    // ── 1. Timing-safe HMAC-SHA256 webhook signature verification ───────────────
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature.length !== signature.length) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(signature,         'hex')
    );

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    // ── 2. Parse and handle payment.captured event ───────────────────────────────
    const event = JSON.parse(rawBody);

    if (event.event === 'payment.captured') {
      const payment   = event.payload.payment.entity;
      const paymentId = payment.id;
      const orderId   = payment.order_id;

      // ── 3. Idempotency: only process if verify/route.ts hasn't already done it ─
      const alreadyProcessed = await isPaymentAlreadyRecorded(paymentId);

      if (!alreadyProcessed) {
        const amount = Number(payment.amount) / 100;
        const notes  = payment.notes || {};

        const name        = notes.name        || 'Attendee';
        const email       = payment.email     || notes.email || '';
        const phone       = payment.contact   || notes.phone || '';
        const company     = notes.company     || '';
        const designation = notes.designation || '';
        const tier        = notes.ticketTier  || 'Standard Pass';

        // ── 4. Append to Google Sheets ──────────────────────────────────────────
        await appendRegistrationRow({
          createdAt:   new Date().toISOString(),
          paymentId,
          orderId,
          ticketTier:  tier,
          amount,
          name,
          email,
          phone,
          company,
          designation,
          status:      'Confirmed',
        });

        // ── 5. Send confirmation email via Resend ────────────────────────────────────
        try {
          if (email) {
            await dispatchTicketConfirmation({
              to:          email,
              name,
              orderId,
              paymentId,
              ticketTier:  tier,
              amount,
              phone,
              company,
              designation,
              bcc: [process.env.ADMIN_EMAIL || ''].filter(Boolean),
            });
          }
        } catch (emailErr) {
          console.error('[Webhook][Mailer] Exception:', emailErr);
        }
      }
    }

    // Always return 200 on valid signature — Razorpay retries on non-200 responses
    return NextResponse.json({ status: 'ok' });

  } catch (err: any) {
    console.error('[Webhook] Error:', err);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
