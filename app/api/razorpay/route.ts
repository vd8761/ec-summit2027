import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { z } from 'zod';

// ── Authoritative server-side pricing (paise). Never trust the client. ─────────
// Prices are sourced from environment variables set at deploy time.
const TIER_PRICING: Record<string, number> = {
  earlybird: Number(process.env.EARLYBIRDPASS || 5000) * 100,
  standard:  Number(process.env.STANDARDPASS  || 10000) * 100,
  vip:       Number(process.env.VIPPASS       || 20000) * 100,
};

const OrderSchema = z.object({
  ticketTier:  z.enum(['earlybird', 'standard', 'vip']),
  name:        z.string().min(1).max(200),
  email:       z.string().email(),
  phone:       z.string().min(7).max(20),
  company:     z.string().max(200).optional().default(''),
  designation: z.string().max(200).optional().default(''),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = OrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { ticketTier, name, email, phone, company, designation } = parsed.data;
    const amountInPaisa = TIER_PRICING[ticketTier];

    // Guard: should never be falsy given the enum, but defensive check
    if (!amountInPaisa) {
      return NextResponse.json({ error: 'Invalid ticket tier' }, { status: 400 });
    }

    const isProduction = process.env.IS_PRODUCTION === 'true';
    const key_id     = isProduction ? process.env.RAZORPAY_PROD_KEY_ID     : process.env.RAZORPAY_DEV_KEY_ID;
    const key_secret = isProduction ? process.env.RAZORPAY_PROD_KEY_SECRET : process.env.RAZORPAY_DEV_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json({ error: 'Razorpay keys not configured' }, { status: 500 });
    }

    const instance = new Razorpay({ key_id, key_secret });

    const order = await instance.orders.create({
      amount:          amountInPaisa,
      currency:        'INR',
      payment_capture: true,  // auto-capture on authorization (test + live)
      receipt:         `rcpt_${Date.now().toString().slice(-10)}`,
      // Store attendee data in notes so the webhook can fulfill without the browser
      notes: {
        ticketTier,
        name,
        email,
        phone,
        company,
        designation,
      },
    });

    // Return key_id so the client knows which Razorpay key to load the modal with
    return NextResponse.json({ order, key_id });

  } catch (error: any) {
    console.error('[Razorpay] Order creation error:', error);
    return NextResponse.json({ error: 'Could not create order' }, { status: 500 });
  }
}
