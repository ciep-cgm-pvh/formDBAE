import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// import { EmailModule } from './SendEmail/email.module';
// import { EmailController } from './SendEmail/email.controller';
// import { EmailService } from './SendEmail/email.service';
// import { JsonService } from './json/json.service';
// import { JsonController } from './json/json.controller';
// import { ConfigModule } from '@nestjs/config';
// import { EmailAuthService } from './SendEmail/email-auth.service';

@Module({
  imports: [
    // EmailModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
  ],
  controllers: [
    AppController, // MANTENHA APENAS ESTE
    // EmailController,
    // JsonController,
  ],
  providers: [
    AppService, // MANTENHA APENAS ESTE
    // EmailAuthService,
    // EmailService,
    // JsonService,
  ],
})
export class AppModule { }