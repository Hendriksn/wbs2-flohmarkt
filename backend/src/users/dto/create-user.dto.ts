import {IsBoolean, IsDate, IsInt, IsNumber, IsOptional, IsString,} from 'class-validator';

export class CreateUserDto {
    @IsString()
    id: number;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    residence: string;

    @IsNumber()
    standNummer: number;

    @IsString()
    role: string;
}
