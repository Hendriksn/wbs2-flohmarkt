import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    buyer: number;

    @Column()
    seller: number;

    @Column()
    article: number;

    @Column({default: () => 'datetime(\'now\')'})
    timestamp: Date;
}
