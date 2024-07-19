import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { nome, nomeSocial, nascimento, cpf, rg, endereco, cep, telefone, email, documento } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'estagiohercules@gmail.com', 
      pass: 'swulu aoxr vrmj amge', 
    },
  });

  const mailOptions = {
    from: 'estagiohercules@gmail.com',
    to: 'informatica@crp-01.org.br', // email de destino
    subject: `Dados do Formulário de ${nome}`,
    text: `
      Nome: ${nome}
      Nome Social: ${nomeSocial}
      Data de Nascimento: ${nascimento}
      CPF: ${cpf}
      RG: ${rg}
      Endereço: ${endereco}
      CEP: ${cep}
      Telefone: ${telefone}
      Email: ${email}
    `,
    attachments: documento ? [
      {
        filename: documento.name,
        content: documento.data,
        encoding: 'base64',
      }
    ] : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email enviado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: `Erro ao enviar email: ${error.message}` });
  }
};

export default sendEmail;
