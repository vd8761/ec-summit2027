import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR', receipt = 'receipt_1' } = await req.json();

    const isProduction = process.env.IS_PRODUCTION === 'true';
    const key_id = isProduction ? process.env.RAZORPAY_PROD_KEY_ID : process.env.RAZORPAY_DEV_KEY_ID;
    const key_secret = isProduction ? process.env.RAZORPAY_PROD_KEY_SECRET : process.env.RAZORPAY_DEV_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json({ error: 'Razorpay keys not configured' }, { status: 500 });
    }

    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt,
    };

    const order = await instance.orders.create(options);
    
    return NextResponse.json({ order, key_id }); // Return key_id so client knows which key to use for the script

  } catch (error: any) {
    console.error('Razorpay Error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
