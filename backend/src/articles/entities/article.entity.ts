import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Favorites} from "../../favorites/entity/favorites.entity";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: "iPhone 14 Pro Smartphone"})
    name: string;

    @Column({default: "Hier verkaufe ich mein geliebtes iPhone."})
    description: string;

    @Column()
    sellerID: number;

    @Column({default: 800})
    price: number;

    @Column({default: false})
    negotiable: boolean;

    @Column({default: 1})
    imageID: number;

    @Column({default: "Technik"})
    category: string;

    @Column({default: "https://images.sparhandy.de/images/geraete/17285/10-l.png?tr=n-sh_large"})
    picSource: string;

    @Column({default: () => 'datetime(\'now\')'})
    creationDate: Date;

    @Column({default: '35398 Gießen'})
    location: string;

    @OneToMany(type => Favorites, favorites => favorites.articleId)
    favorites?: Favorites[];
}
