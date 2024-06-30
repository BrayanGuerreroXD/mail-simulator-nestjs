import { Module } from '@nestjs/common';
import { MailRecordService } from './mail.record.service';
import { MailRecordController } from './mail.record.controller';
import { MailRecord, MailRecordSchema } from './schema/mail.record.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MailRecord.name,
        schema: MailRecordSchema
      }
    ]),
  ],
  controllers: [MailRecordController],
  providers: [MailRecordService],
})
export class MailRecordModule {}
