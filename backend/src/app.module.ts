import { JsonService } from './json/json.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JsonController } from './json/json.controller';

@Module({
  imports: [],
  controllers: [ AppController, JsonController ],
  providers: [
    JsonService, AppService ],
})
export class AppModule { }
