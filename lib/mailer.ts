import { Resend } from 'resend';
import { generateRegistrationEmail } from '@/app/api/razorpay/verify/emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface TicketEmailOptions {
  to:          string;
  name:        string;
  orderId:     string;
  paymentId:   string;
  ticketTier:  string;
  amount:      number;
  phone?:      string;
  company?:    string;
  designation?: string;
  bcc?:        string[];
}

/**
 * Sends the registration confirmation email via Resend.
 * Throws on Resend API error so callers can decide whether to surface it.
 */
export async function dispatchTicketConfirmation(opts: TicketEmailOptions): Promise<void> {
  const htmlBody = generateRegistrationEmail({
    fullName:    opts.name,
    email:       opts.to,
    phone:       opts.phone       || '',
    company:     opts.company     || '',
    designation: opts.designation || '',
    paymentId:   opts.paymentId,
    passType:    opts.ticketTier,
    amountPaid:  opts.amount,
  });

  const { error } = await resend.emails.send({
    from:    process.env.SEND_FROM_EMAIL || 'onboarding@resend.dev',
    to:      [opts.to],
    cc:      process.env.EMAIL_CC ? process.env.EMAIL_CC.split(',') : undefined,
    bcc:     opts.bcc ?? [process.env.ADMIN_EMAIL || '', process.env.EMAIL_BCC || ''].filter(Boolean),
    subject: `Registration Confirmed – EC Summit 2027 (${opts.ticketTier})`,
    html:    htmlBody,
  });

  if (error) {
    throw new Error(`[Resend] Dispatch failed: ${error.message}`);
  }
}
