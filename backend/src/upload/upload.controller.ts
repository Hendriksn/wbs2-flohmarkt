import {
    Body,
    Controller, FileTypeValidator,
    Get, MaxFileSizeValidator, Param, ParseFilePipe,
    ParseFilePipeBuilder,
    Post, Res, StreamableFile,
    UploadedFile,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {Article} from "../articles/entities/article.entity";
import {CreateArticleDto} from "../articles/dto/create-article.dto";
import {AnyFilesInterceptor, FileInterceptor, FilesInterceptor, MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import path from "path";
import {createReadStream} from "fs";
import {doc} from "prettier";
import { join } from 'path';
import {response} from "express";

export const editFileName = (req, file, callback) => {
    //const name = file.originalname.split('.')[0];

    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${"pb_"}-${randomName}`);
};

export const artEditFileName = (req, file, callback) => {
    //const name = file.originalname.split('.')[0];

    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${"article_"}-${randomName}`);
};

@Controller('upload')
export class UploadController {

    @Get('pb/:filename')
    getPbFile(@Param('filename') filename: string): StreamableFile {
        console.log("Abruf: ", filename)
        const file = createReadStream(join(process.cwd(), './assets/pb/'+filename));
        return new StreamableFile(file);
    }

    @Get('article/:filename')
    getArtFile(@Param('filename') filename: string): StreamableFile {
        console.log("Abruf: ", filename)
        const file = createReadStream(join(process.cwd(), './assets/article/'+filename));
        return new StreamableFile(file);
    }

    @Post('pb')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './assets/pb',
                filename: editFileName,
            }),
            //fileFilter: imageFileFilter,
        }),
    )
    async uploadedPBfile(@UploadedFile() file) {
        console.log(file.filename)
        return {data: file.filename}
    }

    @Post('article')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './assets/article',
                filename: artEditFileName,
            }),
            //fileFilter: imageFileFilter,
        }),
    )
    async uploadArticlePicture(@UploadedFile() file) {
        console.log(file.filename);
        return {data: file.filename}
        //return file.filename;
    }



}
