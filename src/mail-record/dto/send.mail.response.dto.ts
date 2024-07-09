import { ApiProperty } from "@nestjs/swagger";

export class SendMailResponseDto {
    @ApiProperty({
        type: String,
        description: 'Message sent',
        example: 'Mail sent successfully'
    })
    message: string;
}