import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnApplicationBootstrap,
  NotFoundException, ParseIntPipe, Put
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {EntityManager, Like, Repository} from "typeorm";
import {Article} from "./entities/article.entity";
import {MessageResultDto} from "../Dto/MessageResultDto";
import {UserEntity} from "../users/entities/user.entity";


@Controller('articles')
export class ArticlesController implements OnApplicationBootstrap{

  private articleRepository: Repository<Article>;

  constructor(private readonly articlesService: ArticlesService, private entityManager: EntityManager) {
    this.articleRepository = entityManager.getRepository(Article);
  }

  async onApplicationBootstrap() {
    /*
    const article = new Article();
    article.id = 1;
    await this.articleRepository.save(article);

    const article1 = new Article();
    article1.id = 2;
    article1.name = "Zweites iPhone im Laden"
    await this.articleRepository.save(article1);

     */
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    console.log(createArticleDto)
    return this.articleRepository.save(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articleRepository.find()
  }

  @Get(':id')
  findOne(@Param('id') id: number)
  {
    return this.articleRepository.find({ where: { id: id } })
  }


  @Get('search/:query')
  searchOne(@Param('query') query: string) {
    return this.articleRepository.find({ where: {name: Like(`%${query}%`) } })
  }

  @Get('user/:id')
  findAllOfUser(@Param('id') id: number) {
    console.log("user/"+id)
    return this.articleRepository.find({ where: { sellerID: id } })
  }



  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto)  {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Put(':id')
  async putArticle(
      @Param('id', ParseIntPipe) id: number,
      @Body() body
  ): Promise<MessageResultDto> {
    const article: Article | null =
        await this.articleRepository.findOneBy({
          id: id,
        });
    if (article == null) {
      throw new NotFoundException();
    }
    article.name = body.name;
    article.description = body.description;
    article.price = body.price;
    article.negotiable = body.negotiable;
    article.category = body.category;
    await this.articleRepository.save(article);
    console.log(article)

    return new MessageResultDto(`Der Artikel mit der Id: ${article.id} wurde erfolgreich angepasst.`)
  }




  @Delete(':id')
  async remove(
      @Param('id') id: number): Promise<MessageResultDto> {
    const article: Article  =
        await this.articleRepository.findOneBy({
          id: id,
        });
    if (article == null){
      throw new NotFoundException();
    }

    await this.articleRepository.remove(article);

    return new MessageResultDto(`${article.id} wurde gelöscht.`)
  }


}
