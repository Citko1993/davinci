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
      from: 'noreply@davinci.agency', // Zweryfikowana domena
      to: ['apps@davinci.agency'],
      subject: `Nowa wiadomość od ${name}`,
      html: `
        <h3>Nowa wiadomość z formularza kontaktowego</h3>
        <p><strong>Od:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
}
