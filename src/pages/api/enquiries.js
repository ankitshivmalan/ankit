import { getDatabase } from 'lib/mongodb';
import { buildEnquiryEmail, getTransporter } from 'lib/mailer';

const requiredFields = ['name', 'email', 'phone', 'service'];

const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);
const toDebugString = (value) => (value ? String(value) : null);
const getErrorDetails = (error) => ({
  name: toDebugString(error?.name),
  message: toDebugString(error?.message),
  code: toDebugString(error?.code),
  command: toDebugString(error?.command),
  response: toDebugString(error?.response),
  responseCode: error?.responseCode ?? null,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const payload = {
    name: req.body?.name?.trim(),
    email: req.body?.email?.trim(),
    phone: req.body?.phone?.trim(),
    company: req.body?.company?.trim() || '',
    service: req.body?.service?.trim(),
  };

  for (const field of requiredFields) {
    if (!payload[field]) {
      return res.status(400).json({ message: `Missing required field: ${field}.` });
    }
  }

  if (!isEmailValid(payload.email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  let enquiryId;

  try {
    const db = await getDatabase();
    const savedEnquiry = {
      ...payload,
      createdAt: new Date(),
      source: 'Ankit Singh portfolio',
    };

    const insertResult = await db.collection('enquiries').insertOne(savedEnquiry);
    enquiryId = insertResult.insertedId;
  } catch (error) {
    const errorDetails = getErrorDetails(error);

    console.error('Failed to save enquiry to database.', {
      error: errorDetails,
      payload,
    });

    return res.status(500).json({
      message: 'Unable to save your enquiry right now.',
      stage: 'database',
      debug: errorDetails,
    });
  }

  try {
    const transporter = getTransporter();
    const to = process.env.ENQUIRY_TO_EMAIL;
    const from = process.env.ENQUIRY_FROM_EMAIL || process.env.SMTP_USER;

    if (!to || !from) {
      throw new Error('Email recipient or sender is not configured.');
    }

    await transporter.sendMail({
      to,
      from,
      replyTo: payload.email,
      subject: `New portfolio enquiry from ${payload.name}`,
      text: [
        'New portfolio enquiry',
        '',
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Company: ${payload.company || 'Not provided'}`,
        `Service: ${payload.service}`,
      ].join('\n'),
      html: buildEnquiryEmail(payload),
    });

    return res.status(200).json({
      message: 'Your enquiry has been saved',
    });
  } catch (error) {
    const errorDetails = getErrorDetails(error);
    const emailConfig = {
      host: toDebugString(process.env.SMTP_HOST),
      port: toDebugString(process.env.SMTP_PORT),
      user: toDebugString(process.env.SMTP_USER),
      hasPass: Boolean(process.env.SMTP_PASS),
      to: toDebugString(process.env.ENQUIRY_TO_EMAIL),
      from: toDebugString(process.env.ENQUIRY_FROM_EMAIL || process.env.SMTP_USER),
    };

    console.error('Failed to send enquiry email.', {
      error: errorDetails,
      enquiryId,
      payload,
      emailConfig,
    });

    return res.status(200).json({
      warning: true,
      message: 'Your enquiry was saved, but the email notification could not be sent.',
      stage: 'email',
      debug: {
        ...errorDetails,
        emailConfig,
      },
    });
  }
}
