import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";

export class CreateMailRecordDto {

    @IsString({message: "Email must be a string"})
    @IsNotEmpty({message: "Email cannot be empty"})
    @IsEmail({}, {message: "Email is not valid"})
    @MaxLength(50, {message: 'Email must be a maximum of 50 characters'})
    email: string;

    @IsString({message: "Plate must be a string"})
    @IsNotEmpty({message: "Plate cannot be empty"})
    @Length(6, 6, {message: 'Plate must be exactly 6 characters'})
    @Matches(/^[a-zA-Z0-9]+$/, {message: 'Plate must be alphanumeric, no special characters or letter ñ'})
    plate: string;

    @IsString({message: "Message must be a string"})
    @IsNotEmpty({message: "Message cannot be empty"})
    message: string;

    @IsString({message: "Parking name must be a string"})
    @IsNotEmpty({message: "Parking name cannot be empty"})
    @MaxLength(50, {message: 'Name must be a maximum of 50 characters'})
    parkingName: string;
}
