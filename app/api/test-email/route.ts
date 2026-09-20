import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateRegistrationEmail } from '../razorpay/verify/emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  // Blocked in production — development/testing only
  if (process.env.IS_PRODUCTION === 'true') {
    return NextResponse.json(
      { error: 'This endpoint is disabled in production' },
      { status: 403 }
    );
  }

  try {
    // Mock data for the test email
    const mockData = {
      fullName: "Lokesh Rajendrababu",
      email: "ariyappan@touchmarkdes.com",
      phone: "9444824499",
      company: "A N L R and Co",
      designation: "Partner",
      paymentId: "pay_Test123456789",
      passType: "Summit 2027 - Early Bird Pass",
      amountPaid: "3500"
    };

    const htmlContent = generateRegistrationEmail(mockData);

    const { data, error } = await resend.emails.send({
      from: process.env.SEND_FROM_EMAIL || 'Executive Collaboration <no-reply@executivescollaboration.com>',
      to: ["executivescollaboration@gmail.com"],
      subject: `[TEST] Registration Confirmed - Millionaire Summit 2027`,
      html: htmlContent
    });

    if (error) {
      return NextResponse.json({ error: error.message || 'Failed to send test email' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully via Resend', 
      data 
    });

  } catch (error: any) {
    console.error('Error sending test email:', error);
    return NextResponse.json({ error: error.message || 'Failed to send test email' }, { status: 500 });
  }
}
