import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailRecordService } from './mail.record.service';
import { CreateMailRecordDto } from './dto/create-mail.record.dto';

@Controller('mail.record')
export class MailRecordController {
  constructor(private readonly mailRecordService: MailRecordService) {}

}
