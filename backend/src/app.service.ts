import {
    Body,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Put
} from "@nestjs/common";
import {EntityManager, Repository} from "typeorm";
import {User} from "./model/userInterface";
import {UsersService} from "./users/users.service";
import {MessageResultDto} from "./Dto/MessageResultDto";
import {UpdateUserDto} from "./users/dto/update-user.dto";
import * as bcrypt from 'bcrypt';
import { from, Observable, of } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AppService {
    private userRepository: Repository<UserEntity>;

    constructor(private readonly usersService: UsersService, private entityManager: EntityManager, private jwtService: JwtService) {
        this.userRepository = entityManager.getRepository(UserEntity);
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    async postUser(user: UserEntity): Promise<MessageResultDto> {
        console.log(user.password)
        user.password = await this.hashPassword(user.password)
        console.log(user.password)
        const newUser = UserEntity.create(user);
        await this.userRepository.save(newUser);
        console.log(newUser.id)
        return new MessageResultDto(
            `${newUser.id} erfolgreich angelegt`,
        );
    }

    login(username: string, password: string): any {
        return this.validateUser(username, password)
    }

     async validateUser(username: string, password: string): Promise<boolean> {

         const user: UserEntity = await this.userRepository.findOne({
             where: {username},
         });
         console.log(user)
         if (!user) {
             throw new HttpException(
                 {status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials'},
                 HttpStatus.FORBIDDEN,
             );
         }
         console.log(user.password)
         let newpassword =  await bcrypt.hash(password, 12)
         console.log(newpassword)

         return bcrypt.compare(user.password, password).then(
             isValidPassword => {
                 console.log(isValidPassword)
                 return isValidPassword
             }
         )

     }

    getJwtUser(jwt: string): Observable<UserEntity | null> {
        return from(this.jwtService.verifyAsync(jwt)).pipe(
            map(({ user }: { user: UserEntity }) => {
                return user;
            }),
            catchError(() => {
                return of(null);
            }),
        );
    }

     findUser(username: string){
        return this.userRepository.findOne({
            where: {username}
        })
     }



    // Returns all existing users
    @Get()
    findAll() {
        return this.userRepository.find()
        //throw new BadRequestException();
    }

    // return a specific user with the given id - if found
    @Get(':id')
    findOne(@Param('id') id: number) {
        const user = new UserEntity();
        user.id = id;
        // @ts-ignore
        return this.userRepository.find({where: {id: id}})
    }


    // Will delete a specific user with given id - if found
    // Test with postman and DELETE http://localhost:3000/users/:id
    // no request-body needed
    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<MessageResultDto> {
        const user: UserEntity | null =
            await this.userRepository.findOneBy({
                id: id,
            });
        if (user == null) {
            throw new NotFoundException();
        }
        await this.userRepository.delete(user);

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
        await this.userRepository.save(user);

        return new MessageResultDto(`Der User mit der Id: ${user.id} wurde erfolgreich angepasst.`)
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }


    async onApplicationBootstrap(): Promise<void> {

    }


}

