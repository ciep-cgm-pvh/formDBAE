import { EmailModule } from './SendEmail/email.module';
import { EmailController } from './SendEmail/email.controller';
import { EmailAuthService } from './SendEmail/email-auth.service';
import { EmailService } from './SendEmail/email.service';
import { JsonService } from './json/json.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JsonController } from './json/json.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EmailModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
  ],
  controllers: [
    EmailController, 
    AppController,
    JsonController 
  ],
  providers: [
    EmailAuthService,
    EmailService,
    JsonService, 
    AppService
  ],
})
export class AppModule { }
