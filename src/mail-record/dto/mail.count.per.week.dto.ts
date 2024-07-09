import { ApiProperty } from "@nestjs/swagger";

export class MailCountPerWeekDto {
    
    @ApiProperty({
        type: String,
        description: 'Date of the week',
        example: '2024-07-10'
    })
    date!: string;

    @ApiProperty({
        type: Number,
        description: 'Number of emails sent in the week',
        example: 5
    })
    count!: number;

    constructor(date: string, count: number) {
        this.date = date;
        this.count = count;
    }
}