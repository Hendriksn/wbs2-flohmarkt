import {IsNumber, IsString} from "class-validator";

export class CreateMessageDto {

    @IsNumber()
    chatID: number;

    @IsString()
    text: string;

    @IsNumber()
    user: number;
}
