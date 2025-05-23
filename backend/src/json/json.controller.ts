import { Body, Controller, Get, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { JsonService } from './json.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EmailService } from './../SendEmail/email.service';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('api')
export class JsonController {
  constructor(private readonly jsonService: JsonService, private readonly emailService: EmailService) { }

  @Post('gerarPdf')
  async gerarPdf(@Body() data: any) {
    return this.jsonService.generatePdf(data)
  }

  @Get('verJson')
  verJson() {
    return this.jsonService.getJson()
  }
  @Get('getAllJson')
  getAllJson() {
    return this.jsonService.getAllJson()
  }

  // Recebe JSON + Anexos -> gera resultado.pdf + merge com anexos
  @Post('gerarPdfComAnexos')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'json', maxCount: 1 },
    { name: 'anexos', maxCount: 10 }
  ]))
  async gerarPdfComAnexos(
    @UploadedFiles()
    files: { json?: Express.Multer.File[]; anexos?: Express.Multer.File[] },
    @Res() res: Response,
  ) {
    const jsonFile = files.json?.[ 0 ];
    const anexos = files.anexos || [];

    if (!jsonFile) return res.status(400).json({ error: 'JSON não enviado.' });

    const jsonData = JSON.parse(jsonFile.buffer.toString());

    // 1. Gera o PDF do formulário
    await this.jsonService.generatePdf(jsonData);

    // 2. Merge com os anexos
    const mergedPdfBuffer = await this.jsonService.mergeWithAttachments(anexos);

    if (!mergedPdfBuffer) {
      return res.status(500).json({ error: 'Erro ao combinar PDFs.' });
    }

    // 3. Salva o PDF temporariamente para envio por e-mail
    const tempDir = path.join(__dirname, '../../temp');

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFileName = `${uuidv4()}.pdf`;
    const tempFilePath = path.join(tempDir, tempFileName);
    fs.writeFileSync(tempFilePath, mergedPdfBuffer);

    try {
      await this.emailService.sendSecureEmail(tempFilePath, jsonData.personalData.email);
      console.log('✅ Email enviado para:', jsonData.personalData.email);
    } catch (err) {
      console.error('❌ Erro ao enviar email:', err);
      return res.status(500).json({ error: "Erro ao enviar e-mail." });
    } finally {
      fs.unlink(tempFilePath, () => { });
    }
    

    // 3. Retorna PDF final para download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=FormComAnexos.pdf',
    });

    return res.send(mergedPdfBuffer);
  }
}
