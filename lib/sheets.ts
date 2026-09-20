import { google } from 'googleapis';

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;

// Sheet columns (must match Row 1 headers exactly):
// A=Timestamp | B=Payment ID | C=Order ID | D=Pass Type | E=Amount Paid
// F=Full Name | G=Email     | H=Phone    | I=Company   | J=Designation | K=Status
const SHEET_NAME           = 'Registrations';
const RANGE_ALL            = `${SHEET_NAME}!A:K`;
const RANGE_PAYMENT_ID_COL = `${SHEET_NAME}!B:B`; // idempotency check column

export interface TicketRegistration {
  createdAt:   string;   // A — Timestamp
  paymentId:   string;   // B — Payment ID
  orderId:     string;   // C — Order ID
  ticketTier:  string;   // D — Pass Type
  amount:      number;   // E — Amount Paid
  name:        string;   // F — Full Name
  email:       string;   // G — Email
  phone:       string;   // H — Phone
  company:     string;   // I — Company
  designation: string;   // J — Designation
  status:      string;   // K — Status
}

/**
 * Checks Column B (Payment ID) for the given paymentId.
 * Returns true if already recorded — used as idempotency guard.
 */
export async function isPaymentAlreadyRecorded(paymentId: string): Promise<boolean> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE_PAYMENT_ID_COL,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return false;

    return rows.some((row) => row[0] === paymentId);
  } catch (error) {
    console.error('[Sheets] Error reading payment IDs:', error);
    // Fail open — let the route continue and log for investigation
    return false;
  }
}

/**
 * Appends a single attendee row to the Registrations sheet.
 * Column order matches the sheet headers exactly.
 */
export async function appendRegistrationRow(data: TicketRegistration): Promise<void> {
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE_ALL,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [
        [
          data.createdAt,    // A — Timestamp
          data.paymentId,    // B — Payment ID
          data.orderId,      // C — Order ID
          data.ticketTier,   // D — Pass Type
          data.amount,       // E — Amount Paid
          data.name,         // F — Full Name
          data.email,        // G — Email
          data.phone,        // H — Phone
          data.company,      // I — Company
          data.designation,  // J — Designation
          data.status,       // K — Status
        ],
      ],
    },
  });
}
