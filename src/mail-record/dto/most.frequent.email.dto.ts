import { ApiProperty } from "@nestjs/swagger";

export class MostFrequentEmailDto {
    @ApiProperty({
        type: String,
        description: 'Email of the user',
        example: 'socio@mail.com'
    })
    email!: string;

    @ApiProperty({
        type: Number,
        description: 'Number of times the email has been sent',
        example: 5
    })
    count!: number;

    constructor(email: string, count: number) {
        this.email = email;
        this.count = count;
    }
}