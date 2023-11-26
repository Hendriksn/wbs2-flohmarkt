import {IsInt, IsNumber, IsString, MinLength} from 'class-validator';


export class PostFavoriteDto {

    @IsNumber()
    public userId: number;

    @IsNumber()
    public articleId: number;

}