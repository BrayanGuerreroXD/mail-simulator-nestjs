import { Expose } from "class-transformer";

export class MailRecordResponseDto {
    @Expose()
    message: string;

    @Expose()
    email: string;

    @Expose()
    plate: string;

    @Expose()
    parkingName: string;
}