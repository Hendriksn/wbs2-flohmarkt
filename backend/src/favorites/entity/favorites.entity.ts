import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';


@Entity()
export class Favorites {
    @PrimaryGeneratedColumn()
    id: number;

    //  many-to-one relationship between the User and the Favorites entity
    // a single User can have multiple Favorites entries, but a single Favorites entry can only belong to a single User
    // Favorites ID | User ID | Article ID
    // 1            | 1       | 1
    // 2            | 1       | 2
    // @ManyToOne(type => UserEntity, user => user.favorites,{onDelete: 'SET NULL'})
   @Column({nullable: true, default: 0})
    public userId: number;

    // many-to-one relationship between the Article and the Favorites entity
    // a single Article can have multiple Favorites entries, but a single Favorites entry can only belong to a single Article
    // Favorites ID | User ID | Article ID
    // 1            | 1       | 1
    // 2            | 2       | 1
    // @ManyToOne(type => Article, article => article.favorites, {onDelete: 'SET NULL'})
    @Column({nullable: true, default: 0})
    public articleId: number;

    public static create(userId: number, articleId: number): Favorites {
        const favorite = new Favorites();
        favorite.userId = userId;
        favorite.articleId = articleId;
        return favorite;
    }
}