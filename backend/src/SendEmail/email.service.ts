import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import * as path from 'path';

@Injectable()
export class EmailService {
  async sendSecureEmail(pdfPath: string, emailDestino: string) {
    if (!emailDestino || typeof emailDestino !== 'string' || !emailDestino.includes('@')) {
      throw new Error('E-mail de destino inválido ou não informado');
    }

    const tokenPath = path.resolve(__dirname, '../../tokens.json');
    const tokens = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));


    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials(tokens);

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: tokens.refresh_token,
        accessToken: accessToken.token,
      },
    });

    const info = await transporter.sendMail({
      from: `"Declaração DBAE" <${process.env.GMAIL_USER}>`,
      to: emailDestino,
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
      ],
    });

    console.log('📧 E-mail enviado com sucesso para:', emailDestino);
  }
}
