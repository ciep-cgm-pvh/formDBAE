import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import * as path from 'path';

const nodemailer = require("nodemailer");
// Carrega as variáveis do arquivo .env para process.env
require("dotenv").config();

@Injectable()
export class EmailService {
  //Função não está sendo utilizada
  // async sendSecureEmail(pdfPath: string, emailDestino: string) {
  //   if (!emailDestino || typeof emailDestino !== 'string' || !emailDestino.includes('@')) {
  //     throw new Error('E-mail de destino inválido ou não informado');
  //   }

  //   const tokenPath = path.resolve(__dirname, '../../tokens.json');
  //   const tokens = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));


  //   const oauth2Client = new google.auth.OAuth2(
  //     process.env.GMAIL_CLIENT_ID,
  //     process.env.GMAIL_CLIENT_SECRET,
  //     'https://developers.google.com/oauthplayground'
  //   );

  //   oauth2Client.setCredentials(tokens);

  //   const accessToken = await oauth2Client.getAccessToken();

  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       type: 'OAuth2',
  //       user: process.env.GMAIL_USER,
  //       clientId: process.env.GMAIL_CLIENT_ID,
  //       clientSecret: process.env.GMAIL_CLIENT_SECRET,
  //       refreshToken: tokens.refresh_token,
  //       accessToken: accessToken.token,
  //     },
  //   });

  //   const info = await transporter.sendMail({
  //     from: `"Declaração DBAE" <${process.env.GMAIL_USER}>`,
  //     to: emailDestino,
  //     subject: 'Declaração de Bens e Atividades Econômicas – DBAE',
  //     html: `
  //       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
  //         <h2 style="color: #003366;">Prefeitura Municipal de Porto Velho</h2>
  //         <p>Prezado(a) servidor(a),</p>
  //         <p>Segue anexo o formulário “Declaração de Bens e Atividades Econômicas ou Profissionais – DBAE” preenchido com seus dados.</p>
  //         <p>Este documento deve ser assinado com sua identidade digital Gov.br e reenviado para o email cgm.ti.pvh@gmail.com</p>
  //         <p>Atenciosamente,<br><strong>Comissão de Ética Pública</strong></p>
  //       </div>
  //     `,
  //     attachments: [
  //       {
  //         filename: 'declaracao_bens_renda.pdf',
  //         path: pdfPath,
  //       },
  //     ],
  //   });

  //   console.log('📧 E-mail enviado com sucesso para:', emailDestino);
  // }

  // Função principal para enviar o e-mail
  
  async enviarFormulario(pdfPath: string, destinatario: string) {
    if (!destinatario || typeof destinatario !== 'string' || !destinatario.includes('@')) {
      throw new Error('E-mail de destino inválido ou não informado');
    }
    try {
      // 1. Pegar as credenciais do ambiente
      const host = process.env.BREVO_HOST;
      const port = process.env.BREVO_PORT;
      const user = process.env.BREVO_CONNECT; // Este é o e-mail do usuário, que deve ser o mesmo do login Brevo
      const sender = process.env.BREVO_SENDER; // Este é o e-mail do remetente, que deve ser o mesmo do login Brevo
      const pass = process.env.BREVO_PASS;
  
      // 2. Criar o "transport" do nodemailer com as credenciais do Brevo
      const transport = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false, // `false` porque usamos a porta 587 (TLS)
        auth: {
          user: user,
          pass: pass, // A senha é a Chave SMTP
        },
      });
  
      console.log("✅ Transportador Brevo configurado.");
  
      // 3. Definir as opções do e-mail
      const mailOptions = {
        from: `"Declaração DBAE" <${sender}>`, // O e-mail do remetente DEVE ser o mesmo do seu login Brevo
        to: destinatario,
        subject: 'Declaração de Bens e Atividades Econômicas – DBAE',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #003366;">Prefeitura Municipal de Porto Velho</h2>
          <p>Prezado(a) servidor(a),</p>
          <p>Segue anexo o formulário “Declaração de Bens e Atividades Econômicas ou Profissionais – DBAE” preenchido com seus dados.</p>
          <p>Este documento deve ser assinado com sua identidade digital Gov.br e reenviado para o email cgm.ti.pvh@gmail.com</p>
          <p>Atenciosamente,<br><strong>Comissão de Ética Pública</strong></p>
        </div>
      `,
        attachments: [ 
          {
            filename: 'declaracao_bens_renda.pdf',
            path: pdfPath,
          }, 
        ]
      };
  
      console.log("✅ Opções do e-mail definidas. Enviando...");
  
      // 4. Enviar o e-mail
      const info = await transport.sendMail(mailOptions);
  
      console.log("🚀 E-mail enviado com sucesso!");
      console.log("ID da Mensagem:", info.messageId);
      console.log(
        "URL de preview (se disponível):",
        nodemailer.getTestMessageUrl(info)
      );
  
      return info;
    } catch (error) {
      console.error("❌ Erro ao enviar o e-mail com Brevo:", error);
    }
  }
}
