import {IsNumber, IsString, MinLength} from "class-validator";

export class PostUserBodyDto {
    @IsString()
    public username?: string;
    public givenName?: string;
    public familyName?: string;
    public telefonnummer?: string;
    public email?: string;
    public password?: string;
    public role?: string;
    public picture?: string;



}