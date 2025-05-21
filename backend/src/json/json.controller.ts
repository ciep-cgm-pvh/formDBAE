import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as PizZip from 'pizzip';
import * as Docxtemplater from 'docxtemplater';
import * as topdf from 'docx2pdf-converter';

@Controller('api')
export class JsonController {
  private storedData: any = null;

  @Post('enviar-json')
  async receberJson(@Body() data: any) {
    this.storedData = data;

    // 1. Caminhos
    const templatePath = path.resolve(__dirname, '..', '..', 'templates', 'modelo.docx');
    const outputDocx = path.resolve(__dirname, '..', '..', 'output', 'resultado.docx');
    const outputPdf = path.resolve(__dirname, '..', '..', 'output', 'resultado.pdf');

    // 2. Ler template e preencher com dados
    const expressionParser = require("docxtemplater/expressions.js");
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      parser: expressionParser,
    });

    try {
      doc.render(data);
    } catch (error) {
      console.error('Erro ao preencher DOCX:', error);
      return { error: 'Erro ao preencher o modelo' };
    }

    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync(outputDocx, buf);
    console.log('✅ DOCX gerado com sucesso');

    // 3. Converter para PDF
    try {
      await topdf.convert(outputDocx, outputPdf);
      console.log('✅ PDF gerado com sucesso');
      fs.unlinkSync(outputDocx)
    } catch (err) {
      console.error('Erro na conversão para PDF:', err);
      return { error: 'Erro ao converter para PDF' };
    }

    return { message: 'Arquivo gerado com sucesso!' };
  }

  @Get('ver-json')
  verJson() {
    if (!this.storedData) {
      return { message: 'Nenhum JSON recebido ainda.' };
    }
    return this.storedData;
  }


  @Get('baixar-pdf')
  baixarPdf(@Res() res: Response) {
    const filePath = path.resolve(__dirname, '..', '..', 'output', 'resultado.pdf');
    if (fs.existsSync(filePath)) {
      res.download(filePath, 'resultado.pdf', (err) => {
        if (err) {
          console.error('Erro ao enviar o PDF:', err);
        } else {
          fs.unlinkSync(filePath); // Apaga o PDF após o download
          console.log('🧹 PDF removido após download');
        }
      });
    } else {
      res.status(404).json({ error: 'Arquivo PDF não encontrado.' });
    }
  }
}
