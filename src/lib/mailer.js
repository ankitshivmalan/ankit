import nodemailer from 'nodemailer';

export const getTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP environment variables are incomplete.');
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const buildEnquiryEmail = (payload) => {
  const rows = [
    ['Name', payload.name],
    ['Email', payload.email],
    ['Phone', payload.phone],
    ['Company', payload.company || 'Not provided'],
    ['Service', payload.service],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">${escapeHtml(label)}</td>
          <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:15px;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `
    <div style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,sans-serif;color:#111827;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#111827,#1f2937);color:#ffffff;">
          <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#d1d5db;">New Portfolio Enquiry</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">${escapeHtml(payload.name)} submitted a new enquiry</h1>
          <p style="margin:12px 0 0;font-size:14px;line-height:1.6;color:#e5e7eb;">A new lead was saved from the portfolio contact form. Review the details below and reply directly to continue the conversation.</p>
        </div>
        <div style="padding:28px 32px;">
          <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tbody>${tableRows}</tbody>
          </table>
          <div style="margin-top:24px;padding:18px 20px;border-radius:12px;background:#f9fafb;border:1px solid #e5e7eb;">
            <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Submission Details</p>
            <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;">
              Source: Ankit Singh portfolio<br />
              Submitted: ${escapeHtml(submittedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>`;
};
