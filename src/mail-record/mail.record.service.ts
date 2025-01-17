import { Injectable } from '@nestjs/common';
import { CreateMailRecordDto } from './dto/create-mail.record.dto';
import { MailRecord } from './schema/mail.record.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { SendMailResponseDto } from './dto/send.mail.response.dto';
import { MailRecordResponseDto } from './dto/mail.record.response.dto';
import { format } from 'date-fns';
import { MostFrequentEmailDto } from './dto/most.frequent.email.dto';
import { MailCountPerWeekDto } from './dto/mail.count.per.week.dto';

@Injectable()
export class MailRecordService {

    constructor(
        @InjectModel(MailRecord.name) private mailRecordModel: Model<MailRecord>,
    ) {}

    async createMailRecord(createMailRecordDto: CreateMailRecordDto): Promise<SendMailResponseDto> {
        const mailRecord = new this.mailRecordModel(createMailRecordDto);
        await mailRecord.save();

        const sendMailResponseDto = new SendMailResponseDto();
        sendMailResponseDto.message = "Mail sent successfully";

        return sendMailResponseDto;
    }

    async getAllRecords(): Promise<MailRecordResponseDto[]> {
        const mailRecordList = await this.mailRecordModel.find().lean();
        return mailRecordList.map(mailRecord => plainToInstance(MailRecordResponseDto, mailRecord, {
            excludeExtraneousValues: true,
        }));
    }

    async findMostFrequentEmail(): Promise<MostFrequentEmailDto> {
        const mailRecordList = await this.mailRecordModel.find().lean();
        if (mailRecordList.length === 0) {
            throw new Error("Mail record list is empty");
        }
    
        const emailCountMap = mailRecordList.reduce((acc, mailRecord) => {
            acc[mailRecord.email] = (acc[mailRecord.email] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    
        const response = Object.entries(emailCountMap).reduce((acc, [email, count]) => {
            return count > acc.count ? { email, count } : acc;
        }, { email: "", count: 0 });
    
        return new MostFrequentEmailDto(response?.email ?? '', response?.count ?? 0);
    }

    async getMailRecordCountPerWeek(): Promise<MailCountPerWeekDto[]> {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
    
        const mailRecordList = await this.mailRecordModel.find({
            registrationDate: {
                $gte: oneWeekAgo,
                $lte: now,
            }
        }).lean();
    
        const dateList = Array.from({ length: 7 }, (_, i) => new Date(oneWeekAgo.getTime() + i * 24 * 60 * 60 * 1000));
        const mailCountMap = mailRecordList.reduce((acc, { registrationDate }) => {
            const date = format(registrationDate, 'yyyy-MM-dd');
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    
        return dateList.map(date => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            return new MailCountPerWeekDto(formattedDate, mailCountMap[formattedDate] || 0);
        });
    }       

}