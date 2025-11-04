import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';

const resend = new Resend(process.env.RESEND_API_KEY || 're_VmLcVGhh_H2GtUgq62XAt5oHLLEUvJ3z3');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend domain
      to: ['apps@davinci.agency'],
      subject: `New message from ${name}`,
      html: `
        <h3>New message from contact form</h3>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    try {
      console.error('Error details:', JSON.stringify(error, null, 2));
    } catch {
      // ignore JSON stringify errors
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error sending email', error: message });
  }
}
