import { Injectable } from '@nestjs/common';
import * as topdf from 'docx2pdf-converter';
import * as Docxtemplater from 'docxtemplater';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as PizZip from 'pizzip';

@Injectable()
export class JsonService {
  private storedData: any = null;

  // Retorna os dados armazenados na memória (última submissão)
  getJson() {
    if (!this.storedData) {
      return { message: 'Nenhum JSON recebido ainda.' };
    }
    return this.storedData;
  }

  // Salva o json no arquivo FormJsonDatabase.json 
  saveToDisk(data: any) {
    const filePath = path.resolve(__dirname, '..', '..', 'output', 'FormJsonDatabase.json');
    let banco: Record<string, any> = {};

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        banco = JSON.parse(fileContent);
      } catch (err) {
        console.error('Erro ao ler banco JSON:', err);
      }
    }

    // Gerar novo ID baseado na quantidade atual
    const novoId = Object.keys(banco).length + 1;
    const chave = `FormJson_${novoId}`;
    banco[ chave ] = data;

    try {
      fs.writeFileSync(filePath, JSON.stringify(banco, null, 2));
      console.log(`📝 ${chave} salvo com sucesso`);
    } catch (err) {
      console.error('Erro ao salvar no banco JSON:', err);
    }
  }

  // Retorna todos os dados do "banco" JSON
  getAllJson() {
    const filePath = path.resolve(__dirname, '..', '..', 'output', 'FormJsonDatabase.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  }

  // Gera o pdf com base no json, e chama a funçao saveToDisk()
  async generatePdf(data: any) {
    this.storedData = data;

    // 1. Caminhos
    const templatePath = path.resolve(__dirname, '..', '..', 'templates', 'modelo.docx');
    const outputDocx = path.resolve(__dirname, '..', '..', 'output', 'resultado.docx');
    const outputPdf = path.resolve(__dirname, '..', '..', 'output', 'resultado.pdf');

    // 2. Ler template e preencher com dados
    this.saveToDisk(data);
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

  // Envia o PDF gerado ao frontend para download e o remove do disco após o envio
  downloadPdf(res: Response) {
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
