import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MailRecordService } from './mail.record.service';
import { CreateMailRecordDto } from './dto/create-mail.record.dto';
import { SendMailResponseDto } from './dto/send.mail.response.dto';
import { MailRecordResponseDto } from './dto/mail.record.response.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MostFrequentEmailDto } from './dto/most.frequent.email.dto';
import { MailCountPerWeekDto } from './dto/mail.count.per.week.dto';
import { createErrorResponse } from 'src/config/base.swagger.error.response.options';

@ApiTags('Mail Record')
@Controller('mail-record')
export class MailRecordController {
  constructor(private readonly mailRecordService: MailRecordService) {}

  @ApiBody({ type: CreateMailRecordDto })
  @ApiResponse({ status: 201, type: SendMailResponseDto })
  @ApiResponse(createErrorResponse(HttpStatus.BAD_REQUEST, 'Bad Request - Caused by an incorrect request object', 'BadRequestException', [
    "Email must be a maximum of 50 characters",
    "Email is not valid",
    "Email cannot be empty",
    "Email must be a string"
  ]))
  @Post("/send")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMailRecordDto: CreateMailRecordDto) : Promise<SendMailResponseDto> {
    return await this.mailRecordService.createMailRecord(createMailRecordDto);
  }

  @ApiResponse({ status: 200, type: MailRecordResponseDto, isArray: true})
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<MailRecordResponseDto[]> {
    return await this.mailRecordService.getAllRecords();
  }

  @ApiResponse({ status: 200, type: MostFrequentEmailDto})
  @ApiResponse(createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Error - Caused by mail record list is empty', 'Error', ['Mail record list is empty']))
  @Get("/most-frequent-email")
  @HttpCode(HttpStatus.OK)
  async findMostFrequentEmail(): Promise<MostFrequentEmailDto> {
    return await this.mailRecordService.findMostFrequentEmail();
  }

  @ApiResponse({ status: 200, type: MailCountPerWeekDto, isArray: true})
  @Get("/count-per-week")
  @HttpCode(HttpStatus.OK)
  async getMailRecordCountPerWeek(): Promise<MailCountPerWeekDto[]> {
    return await this.mailRecordService.getMailRecordCountPerWeek();
  }

}