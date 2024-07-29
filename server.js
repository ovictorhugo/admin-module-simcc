import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors'; // Importa o pacote cors

const app = express();

// Configura o middleware cors
app.use(cors({
  origin: 'http://localhost:8080', // Substitua pelo domínio da sua aplicação cliente
  methods: 'POST',
  allowedHeaders: 'Content-Type',
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'conectee.eng@gmail.com',
    pass: 'vh2004VH',
  },
});

app.post('/api/send-email', async (req, res) => {
  const { html } = req.body;

  const mailOptions = {
    from: 'conectee.eng@gmail.com',
    to: 'victorhugodejesusoliveira@gmail.com',
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
