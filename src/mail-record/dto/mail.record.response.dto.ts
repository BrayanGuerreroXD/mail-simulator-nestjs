import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class MailRecordResponseDto {
    @Expose()
    @ApiProperty({
        type: String,
        description: 'Message to be sent',
        example: 'The vehicle with plate ABC123 is parked in the wrong place. Please move it.'
    
    })
    message: string;

    @Expose()
    @ApiProperty({
        type: String,
        description: 'Email of the user',
        example: 'socio@mail.com'
    })
    email: string;

    @Expose()
    @ApiProperty({
        type: String,
        description: 'Plate of the vehicle',
        example: 'ABC123'
    })
    plate: string;

    @Expose()
    @ApiProperty({
        type: String,
        description: 'Name of the parking',
        example: 'Parking 1'
    })
    parkingName: string;
}