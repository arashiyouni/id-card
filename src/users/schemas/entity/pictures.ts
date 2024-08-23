import { Column, Entity } from "typeorm";

@Entity('PICTURES')
export class Picture {
    
    @Column({length: 8})
    id: string;

    @Column('int')
    length: number;

    @Column('image')
    picture: string;

    @Column('int')
    type: number

    @Column('datetime')
    fecha: Date
}