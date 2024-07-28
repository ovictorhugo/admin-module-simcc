import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.eng.ufmg.br', // Substitua pelo host SMTP correto do seu servidor Zimbra
  port: 587, // Use a porta correta (587 para TLS ou 465 para SSL)
  secure: false, // Use 'true' se a porta for 465 (SSL)
  auth: {
    user: 'vitrinepatrimonio@eng.ufmg.br',
    pass: 'xyz888@_A',
  },
  tls: {
    rejectUnauthorized: false, // Adicione isso se estiver enfrentando problemas com certificados SSL não confiáveis
  },
});

app.post('/api/send-email', async (req, res) => {
  const { html } = req.body;

  const mailOptions = {
    from: 'vitrinepatrimonio@eng.ufmg.br',
    to: 'victorhugodejesus2004@hotmail.com',
    subject: 'Notificação',
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).send('Erro ao enviar email');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
