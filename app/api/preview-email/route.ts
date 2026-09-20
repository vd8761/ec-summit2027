import { NextResponse } from 'next/server';
import { generateRegistrationEmail } from '../razorpay/verify/emailTemplate';

export async function GET(req: Request) {
  // Blocked in production — development/preview only
  if (process.env.IS_PRODUCTION === 'true') {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Mock data for the test email preview
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

  // Return HTML directly for browser preview
  return new NextResponse(htmlContent, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}
