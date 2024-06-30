import { Module } from '@nestjs/common';
import { MailRecordModule } from './mail-record/mail.record.module';

@Module({
  imports: [MailRecordModule],
  providers: [],
})
export class AppModule {}
