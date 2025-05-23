import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailAuthService } from './email-auth.service';
import { EmailController } from './email.controller';

@Module({
    providers: [ EmailService, EmailAuthService ],
    controllers: [ EmailController ],
    exports: [ EmailService ],
})
export class EmailModule { }
