import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import {EntityManager, Repository} from "typeorm";
import {Article} from "../articles/entities/article.entity";
import {ArticlesService} from "../articles/articles.service";
import {Message} from "./entities/message.entity";
import {Role} from "../model/role.enum";

@Controller('message')
export class MessageController {
  private messageRepository: Repository<Message>;

  constructor(private readonly messageService: MessageService, private entityManager: EntityManager) {
    this.messageRepository = entityManager.getRepository(Message);
  }

  @Post()
  create(
      @Body("chatID") chatID: number,
      @Body("text") text: string,
      @Body("user") user: number,)
  {
    const message = new Message()
        message.chatID = chatID;
    message.text = text;
    message.user = user;
    return this.messageRepository.save(message);
  }

  @Get()
  findAll() {
    return this.messageRepository.find()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messageRepository.find({ where: { chatID: id } })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
