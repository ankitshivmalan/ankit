import { getDatabase } from 'lib/mongodb';
const requiredFields = ['name', 'email', 'phone', 'service'];

const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

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

  try {
    const db = await getDatabase();
    const savedEnquiry = {
      ...payload,
      createdAt: new Date(),
      source: 'Ankit Singh portfolio',
    };

    await db.collection('enquiries').insertOne(savedEnquiry);

    // const transporter = getTransporter();
    // const to = process.env.ENQUIRY_TO_EMAIL;
    // const from = process.env.ENQUIRY_FROM_EMAIL || process.env.SMTP_USER;

    // if (!to || !from) {
    //   throw new Error('Email recipient or sender is not configured.');
    // }

    // await transporter.sendMail({
    //   to,
    //   from,
    //   replyTo: payload.email,
    //   subject: `New portfolio enquiry from ${payload.name}`,
    //   text: [
    //     `Name: ${payload.name}`,
    //     `Email: ${payload.email}`,
    //     `Phone: ${payload.phone}`,
    //     `Company: ${payload.company || 'N/A'}`,
    //     `Service: ${payload.service}`,
    //     '',
    //     payload.message,
    //   ].join('\n'),
    // });

    return res.status(200).json({ message: 'Enquiry submitted successfully.' });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal server error.',
    });
  }
}
