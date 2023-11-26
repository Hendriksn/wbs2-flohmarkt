import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Patch,
    Param,
    OnApplicationBootstrap,
    BadRequestException,
    ExceptionFilter,
    Catch,
    UnauthorizedException,
    ArgumentsHost,
    HttpException,
    ParseIntPipe, NotFoundException, Put
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {EntityManager, Repository} from "typeorm";
import {UserEntity} from "./entities/user.entity";
import {PostUserBodyDto} from "./dto/PostUserBodyDto";
import {MessageResultDto} from "../Dto/MessageResultDto";
import {Role} from "../model/role.enum";


/***********************************************************************************************************************
 *                                       all user-related database action
 **********************************************************************************************************************/

@Controller('users')
export class UsersController implements OnApplicationBootstrap {
    private userRepository: Repository<UserEntity>;

    constructor(private readonly usersService: UsersService, private entityManager: EntityManager) {
        this.userRepository = entityManager.getRepository(UserEntity);
    }

    // Add a new user
    // Post User Route: http://localhost:3000/users
    // Body type: json: {"id":4,"firstName":"Martina","lastName":"Musterfrau"}
    @Post()
    async postUser(
        @Body() body: PostUserBodyDto,
    )
    {

    }


    // Returns all existing users
    @Get()
    async findAll() {
        return this.userRepository.find()
    }


    @Get(':id')
    findOne(@Param('id') id: number) {
        const user = new UserEntity();
        user.id = id;
        // @ts-ignore
        return this.userRepository.find({where: {id: id}})
    }

    /*
    // return a specific user with the given id - if found
    @Get(':id')
    async findOne(@Param('id') id: number): Promise <MessageResultDto> {
        const user = new UserEntity();
        user.id = id;

        if (user == null){
            throw new NotFoundException();
        }
        // @ts-ignore
        return  this.userRepository.find({where: {id: id}})
        // return new MessageResultDto(`${user.id} gefunden.`)
    }

     */


    // Will delete a specific user with given id - if found
    // Test with postman and DELETE http://localhost:3000/users/:id
    // no request-body needed
    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<MessageResultDto> {

        console.log("Nutzer wird gelöscht")
        const user: UserEntity | null =
            await this.userRepository.findOneBy({
                id: id,
            });
        if (user == null) {
            throw new NotFoundException();
        }
        await this.userRepository.remove(user);
        return new MessageResultDto(`${user.id} wurde gelöscht.`)
    }


    // Will update specific user with given id - if found
    // Test with postman and PUT http://localhost:3000/users/1
    // body: raw, json and paste: {"firstName":"Monkey D.","lastName":"Luffy"}
    @Put(':id')
    async putUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() body
    ): Promise<MessageResultDto> {
        const user: UserEntity | null =
            await this.userRepository.findOneBy({
                id: id,
            });
        if (user == null) {
            throw new NotFoundException();
        }
        user.givenName = body.givenName;
        user.familyName = body.familyName;
        user.telefonnummer = body.telefonnummer
        user.email = body.email
        user.standNummer = body.standNummer;
        user.username = body.username;
        user.password = body.password;
        user.picture = body.picture
        await this.userRepository.save(user);
        console.log(user)

        return new MessageResultDto(`Der User mit der Id: ${user.id} wurde erfolgreich angepasst.`)
    }


    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }


    async onApplicationBootstrap(): Promise<void> {

        const user = new UserEntity();
        user.id=0;
        user.familyName = "Bill";
        user.givenName = "Gates";
        user.username = "billgates";
        user.telefonnummer = "0123456";
        user.email = "bill@gates.com";
        user.password = "1234";
        user.role = Role.SELLER;
        user.standNummer = 1337;

        await this.userRepository.save([user]);

        const user2 = new UserEntity();
        user2.id=1
        user2.familyName = "Angela";
        user2.givenName = "Merkel";
        user2.username = "angy";
        user2.telefonnummer = "012345633";
        user2.email = "angy@gmx.de";
        user2.password = "12345";
        user2.role = Role.BUYER;
        user2.standNummer = null;

        await this.userRepository.save([user2]);

    }


}
