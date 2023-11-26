import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from "../../model/role.enum";
import {Favorites} from "../../favorites/entity/favorites.entity";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable: true})
    public username: string;

    @Column({nullable: true})
    public givenName: string;

    @Column({nullable: true})
    public familyName: string;

    @Column({nullable: true})
    public telefonnummer: string;

    @Column({nullable: true})
    public email: string;

    @Column({nullable: true})
    public password: string;

    @Column({nullable: true})
    public picture: string;

    @Column({nullable: true})
    public role: Role;

    @Column({nullable: true})
    public standNummer?: number;

    @OneToMany(type => Favorites, favorites => favorites.userId)
    favorites?: Favorites[];




    public static create(CREATEuser: UserEntity): UserEntity {
        const user = new UserEntity();
        user.username = CREATEuser.username
        user.givenName = CREATEuser.givenName;
        user.familyName = CREATEuser.familyName;
        user.telefonnummer = CREATEuser.telefonnummer;
        user.email = CREATEuser.email;
        user.password = CREATEuser.password;
        user.picture = CREATEuser.picture

        if (CREATEuser.role === "buyer")
            user.role = Role.BUYER
        else if (CREATEuser.role === "seller") {
            user.role = Role.SELLER
        }
        return user;
    }



}