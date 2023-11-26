import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chatID: number;

    @Column()
    text: string;

    @Column()
    user: number;

    @Column({default: () => 'datetime(\'now\')'})
    timestamp: Date;
}
