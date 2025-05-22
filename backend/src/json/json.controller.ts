import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { JsonService } from './json.service';

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

  @Get('baixarPdf')
  baixarPdf(@Res() res: Response) {
    return this.jsonService.downloadPdf(res)
  }
}
