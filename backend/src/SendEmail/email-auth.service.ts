// src/SendEmail/email-auth.service.ts
// Service não está sendo utilizada

import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailAuthService {
  private TOKEN_PATH = path.join(__dirname, '../../tokens.json');
  private CREDENTIALS_PATH = path.join(__dirname, '../../credentials.json');

  async getOAuth2Client() {
    const credentials = JSON.parse(fs.readFileSync(this.CREDENTIALS_PATH, 'utf8'));
    const { client_id, client_secret, redirect_uris } = credentials.web;

    const oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[ 0 ]
    );

    if (fs.existsSync(this.TOKEN_PATH)) {
      const token = JSON.parse(fs.readFileSync(this.TOKEN_PATH, 'utf8'));
      oauth2Client.setCredentials(token);
    } else {
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: [
          'https://www.googleapis.com/auth/gmail.send',
          'https://www.googleapis.com/auth/userinfo.email',
        ],
      });

      console.log('🔐 Autorize o app acessando:');
      console.log(authUrl);
    }

    return oauth2Client;
  }

  async saveToken(code: string) {
    const credentials = JSON.parse(fs.readFileSync(this.CREDENTIALS_PATH, 'utf8'));
    const { client_id, client_secret, redirect_uris } = credentials.web;

    const oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[ 0 ]
    );

    const { tokens } = await oauth2Client.getToken(code);
    fs.writeFileSync(this.TOKEN_PATH, JSON.stringify(tokens));
    console.log('✅ Token salvo com sucesso!');
  }
}
