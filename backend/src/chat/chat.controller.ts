import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import {EntityManager, Repository} from "typeorm";
import {Chat} from "./entities/chat.entity";

@Controller('chat')
export class ChatController {
  private chatRepository: Repository<Chat>;

  constructor(private readonly chatService: ChatService, private entityManager: EntityManager) {
    this.chatRepository = entityManager.getRepository(Chat);
  }

  @Post()
  create(@Body("buyer") buyer: number,
         @Body("seller") seller: number,
          @Body("article") article: number){
    console.log(buyer)
    const chat = new Chat()
    chat.buyer = buyer;
    chat.seller = seller;
    chat.article = article
    return this.chatRepository.save(chat);
  }

  @Get()
  findAll() {
    return this.chatRepository.find()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.chatRepository.find({ where: [ { buyer: id }, {seller: id} ]})
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
