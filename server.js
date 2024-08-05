import express from 'express';
import { Resend } from 'resend';

const app = express();
const resend = new Resend('re_6AA8G4Xg_Fw6F5vwjtFCQYvcCgvabbCMX');

app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { html } = req.body;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'victorhugodejesusoliveira@gmail.com',
      subject: 'Hello World',
      html,
    });

    res.status(200).send({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send emails.' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
