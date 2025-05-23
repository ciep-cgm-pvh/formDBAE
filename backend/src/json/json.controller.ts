import { Body, Controller, Get, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { JsonService } from './json.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class JsonController {
  constructor(private readonly jsonService: JsonService) { }

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

    // 3. Retorna PDF final para download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=FormComAnexos.pdf',
    });

    return res.send(mergedPdfBuffer);
  }
}
