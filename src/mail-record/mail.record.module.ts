import { Module } from '@nestjs/common';
import { MailRecordService } from './mail.record.service';
import { MailRecordController } from './mail.record.controller';

@Module({
  controllers: [MailRecordController],
  providers: [MailRecordService],
})
export class MailRecordModule {}
