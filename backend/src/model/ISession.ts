import {UserEntity} from "../users/entities/user.entity";

export interface ISession{
    isLoggedIn?: boolean;
    user: UserEntity
}