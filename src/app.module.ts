import { Module } from '@nestjs/common';
import { MailRecordModule } from './mail-record/mail.record.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MailRecordModule
  ],
  providers: [],
})
export class AppModule {}
