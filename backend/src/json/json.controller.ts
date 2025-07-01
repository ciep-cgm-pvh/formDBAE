import { Body, Controller, Get, Logger, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { JsonService } from './json.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EmailService } from './../SendEmail/email.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('api')
export class JsonController {
  private readonly logger = new Logger(JsonController.name);

  constructor(
    private readonly jsonService: JsonService,
    private readonly emailService: EmailService
  ) { }

  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }


  @Post('gerarPdfComAnexos')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'json', maxCount: 1 },
    { name: 'anexos', maxCount: 10 }
  ]))
  async gerarPdfComAnexos(
    @UploadedFiles() files: { json?: Express.Multer.File[]; anexos?: Express.Multer.File[] },
    @Res() res: Response,
  ) {
    const jsonFile = files.json?.[ 0 ];
    const anexos = files.anexos || [];

    if (!jsonFile) {
      return res.status(400).json({ error: 'JSON não enviado.' });
    }

    const jsonData = JSON.parse(jsonFile.buffer.toString());

    try {
      // 1. Gera o PDF do formulário (agora retorna um buffer)
      const formPdfBuffer = await this.jsonService.generatePdf(jsonData);

      // 2. Merge com os anexos
      const mergedPdfBuffer = await this.jsonService.mergeWithAttachments(formPdfBuffer, anexos);

      // 3. Salva o PDF final temporariamente para envio por e-mail
      const tempFilePath = path.join('/tmp', `form_${Date.now()}.pdf`);
      fs.writeFileSync(tempFilePath, mergedPdfBuffer);
      this.logger.log(`Arquivo final salvo em: ${tempFilePath}`);

      // 4. Envia o e-mail com o anexo
      await this.emailService.enviarFormulario(tempFilePath, jsonData.personalData.email);
      this.logger.log(`✅ Email enviado para: ${jsonData.personalData.email}`);

      // 5. Limpa o arquivo temporário após o envio
      fs.unlinkSync(tempFilePath);

      // 6. Retorna o PDF final para download no frontend
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=FormularioComAnexos.pdf',
      });
      return res.send(mergedPdfBuffer);

    } catch (err) {
      this.logger.error('❌ Erro no fluxo de geração de PDF e e-mail:', err);
      return res.status(500).json({ error: "Erro interno no servidor.", details: err.message });
    }
  }
}