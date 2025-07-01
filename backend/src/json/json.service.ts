import { Injectable, Logger } from '@nestjs/common';
import * as topdf from 'docx2pdf-converter';
import * as Docxtemplater from 'docxtemplater';
import * as fs from 'fs';
import * as path from 'path';
import * as PizZip from 'pizzip';
import { PDFDocument } from 'pdf-lib';

@Injectable()
export class JsonService {
  private readonly logger = new Logger(JsonService.name);

  // NOTA IMPORTANTE: O diretório /tmp na Vercel não é persistente.
  // Esta "base de dados" em JSON será reiniciada a cada nova instância da função.
  // Para dados persistentes, considere usar Vercel Postgres, Vercel KV ou um serviço de banco de dados externo.
  private saveToDisk(data: any) {
    const tempDbPath = path.join('/tmp', 'FormJsonDatabase.json');
    let banco: Record<string, any> = {};

    if (fs.existsSync(tempDbPath)) {
      try {
        const fileContent = fs.readFileSync(tempDbPath, 'utf-8');
        banco = JSON.parse(fileContent);
      } catch (err) {
        this.logger.error('Erro ao ler banco JSON temporário:', err);
      }
    }

    const novoId = Object.keys(banco).length + 1;
    const chave = `FormJson_${novoId}`;
    banco[ chave ] = data;

    try {
      fs.writeFileSync(tempDbPath, JSON.stringify(banco, null, 2));
      this.logger.log(`📝 ${chave} salvo com sucesso no /tmp`);
    } catch (err) {
      this.logger.error('Erro ao salvar no banco JSON temporário:', err);
    }
  }

  async generatePdf(data: any) {
    this.saveToDisk(data); // Salva os dados do formulário

    const temAnexos = data.optionalAttachments?.anexos?.length > 0;

    // 1. Caminhos - Lendo do diretório de build e escrevendo no /tmp
    const templateName = temAnexos ? 'modeloAnexos.docx' : 'modelo.docx';
    const templatePath = path.resolve(process.cwd(), 'dist/templates', templateName);
    const outputDocx = path.join('/tmp', 'resultado.docx');
    const outputPdf = path.join('/tmp', 'resultado.pdf');

    // Verifica se o template existe
    if (!fs.existsSync(templatePath)) {
      this.logger.error(`Template não encontrado em: ${templatePath}`);
      throw new Error(`Template ${templateName} não encontrado.`);
    }

    // 2. Ler template e preencher com dados
    const expressionParser = require("docxtemplater/expressions.js");
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      parser: expressionParser,
    });

    doc.render(data);

    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync(outputDocx, buf);
    this.logger.log('✅ DOCX gerado com sucesso em /tmp');

    // 3. Converter para PDF
    await topdf.convert(outputDocx, outputPdf);
    this.logger.log('✅ PDF gerado com sucesso em /tmp');

    // Limpa o docx intermediário
    fs.unlinkSync(outputDocx);

    // Retorna o buffer do PDF gerado para uso posterior
    return fs.readFileSync(outputPdf);
  }

  async mergeWithAttachments(generatedPdfBuffer: Buffer, anexos: Express.Multer.File[]): Promise<Buffer> {
    const mergedPdf = await PDFDocument.create();

    const addPdfToMerged = async (buffer: Buffer) => {
      const pdf = await PDFDocument.load(buffer);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    };

    // 1. Adiciona o PDF do formulário gerado
    await addPdfToMerged(generatedPdfBuffer);

    // 2. Adiciona os PDFs anexados
    for (const file of anexos) {
      await addPdfToMerged(file.buffer);
    }

    const finalBuffer = await mergedPdf.save();
    return Buffer.from(finalBuffer);
  }
}