import { Controller, Get, Post, Body } from '@nestjs/common';
import { MailRecordService } from './mail.record.service';
import { CreateMailRecordDto } from './dto/create-mail.record.dto';
import { SendMailResponseDto } from './dto/send.mail.response.dto';
import { MailRecordResponseDto } from './dto/mail.record.response.dto';

@Controller('mail-record')
export class MailRecordController {
  constructor(private readonly mailRecordService: MailRecordService) {}

  @Post("/send")
  async create(@Body() createMailRecordDto: CreateMailRecordDto) : Promise<SendMailResponseDto> {
    return await this.mailRecordService.createMailRecord(createMailRecordDto);
  }

  @Get()
  async findAll(): Promise<MailRecordResponseDto[]> {
    return await this.mailRecordService.getAllRecords();
  }

  @Get("/most-frequent-email")
  async findMostFrequentEmail(): Promise<{ email: string, count: number }> {
    return await this.mailRecordService.findMostFrequentEmail();
  }

  @Get("/count-per-week")
  async getMailRecordCountPerWeek(): Promise<{ date: string, count: number }[]> {
    return await this.mailRecordService.getMailRecordCountPerWeek();
  }

}