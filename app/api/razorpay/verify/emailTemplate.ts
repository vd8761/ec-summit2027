export function generateRegistrationEmail(data: any) {
  // Use NEXT_PUBLIC_SITE_URL for production, fallback to localhost for local dev/preview
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002';
  const logoUrl = `${baseUrl}/EC_logo.png`;
  const bgUrl = `${baseUrl}/Hero_banner_background.png`;
  
  const qrString = `Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company}\nRole: ${data.designation}\nPass: ${data.passType}\nAmount: INR ${data.amountPaid}\nPayID: ${data.paymentId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrString)}&color=0f172a&bgcolor=ffffff`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #050b14; color: #1e293b; -webkit-font-smoothing: antialiased;">
  
  <!-- Outer Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #050b14; padding: 40px 20px;">
    <tbody>
      <tr>
        <td align="center">
          
          <!-- VIP Ticket Container -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,136,0,0.3);">
            
            <!-- White Header with Logo -->
            <tbody>
              <tr>
                <td style="background-color: #ffffff; padding: 25px 40px; text-align: center;">
                  <img src="${logoUrl}" alt="EC Summit 2027" style="max-width: 160px; height: auto; display: block; margin-left: auto; margin-right: auto;" />
                </td>
              </tr>
            </tbody>

            <!-- Hero Section -->
            <tbody>
              <tr>
                <td style="background: url('${bgUrl}') center/cover no-repeat; padding: 0; border-top: 1px solid #f1f5f9; border-bottom: 2px solid #FF8800;">
                  <div style="background: linear-gradient(180deg, rgba(11,15,25,0.4) 0%, rgba(11,15,25,0.85) 100%); padding: 40px 40px; text-align: center;">
                    
                    <div style="display: inline-block; background-color: #FF8800; background-image: linear-gradient(135deg, #FFB800 0%, #FF8800 50%, #E65C00 100%); border: 1px solid rgba(255,136,0,0.8); padding: 6px 16px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.15em; font-size: 11px; color: #ffffff; font-weight: 800; margin-bottom: 16px; text-shadow: 0 1px 2px rgba(0,0,0,0.3); box-shadow: 0 4px 12px rgba(255,136,0,0.3);">
                      ${data.passType}
                    </div>
                    
                    <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: -0.03em; line-height: 1.1; text-shadow: 0 4px 12px rgba(0,0,0,0.6);">
                      Millionaire<br/>Summit 2027
                    </h1>
                  </div>
                </td>
              </tr>

              <!-- Ticket Stub Top Section -->
              <tr>
                <td style="padding: 35px 40px 25px 40px; background: url('https://www.transparenttextures.com/patterns/cubes.png') #ffffff;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tbody>
                      <tr>
                        <!-- Attendee Info -->
                        <td width="70%" valign="middle">
                          <div style="font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 700; margin-bottom: 8px;">Pass Holder</div>
                          <div style="font-size: 26px; font-weight: 800; color: #0f172a; line-height: 1.2;">${data.fullName}</div>
                        </td>
                        <!-- QR Code Stub -->
                        <td width="30%" align="right" valign="middle">
                          <div style="display: inline-block; text-align: center;">
                            <div style="background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 6px;">
                              <img src="${qrCodeUrl}" alt="Ticket QR Code" width="80" height="80" style="display: block; opacity: 0.9;" />
                            </div>
                            <div style="font-family: 'Space Mono', Consolas, 'Courier New', monospace; font-size: 9px; color: #94a3b8; letter-spacing: 0.05em; text-align: center; width: 100%;">SCAN AT ENTRY</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <!-- Perforation Line -->
              <tr>
                <td style="padding: 0 40px; position: relative;">
                  <!-- Dotted tear line -->
                  <div style="border-top: 2px dashed #cbd5e1; height: 1px; width: 100%;"></div>
                </td>
              </tr>

              <!-- Ticket Stub Details -->
              <tr>
                <td style="padding: 30px 40px; background-color: #fafaf9;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tbody>
                      <tr>
                        <!-- Left Data -->
                        <td width="50%" valign="top" style="padding-right: 15px;">
                          <div style="margin-bottom: 20px;">
                            <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 4px;">Designation & Company</div>
                            <div style="font-size: 14px; font-weight: 700; color: #0f172a;">${data.designation}, ${data.company}</div>
                          </div>
                          <div>
                            <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 4px;">Order ID</div>
                            <div style="font-family: 'Space Mono', Consolas, 'Courier New', monospace; font-size: 12px; font-weight: 600; color: #475569;">${data.paymentId}</div>
                          </div>
                        </td>
                        <!-- Right Data -->
                        <td width="50%" valign="top" style="padding-left: 15px;">
                          <div style="margin-bottom: 20px;">
                            <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 4px;">Email</div>
                            <div style="font-size: 13px; font-weight: 600; color: #0f172a;">${data.email}</div>
                          </div>
                          <div>
                            <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 4px;">Total Paid</div>
                            <div style="font-size: 16px; font-weight: 800; color: #22c55e;">₹${data.amountPaid}</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              
              <!-- Footer Section -->
              <tr>
                <td style="background-color: #f1f5f9; padding: 25px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 11px; color: #64748b; line-height: 1.5;">
                    Please present this digital pass or the QR code at the registration desk.<br/>
                    For support, contact <a href="mailto:info@executivescollaboration.com" style="color: #003DFF; text-decoration: none; font-weight: 600;">info@executivescollaboration.com</a>
                  </p>
                  <p style="margin: 16px 0 0 0; font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">
                    © ${new Date().getFullYear()} Executives Collaboration. All rights reserved.
                  </p>
                </td>
              </tr>

            </tbody>
          </table>
          
          <!-- Meta Footer -->
          <div style="margin-top: 24px; text-align: center; font-size: 11px; color: #64748b; letter-spacing: 0.05em; text-transform: uppercase;">
            Issued on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' })}
          </div>

        </td>
      </tr>
    </tbody>
  </table>

</body>
</html>`;
}

