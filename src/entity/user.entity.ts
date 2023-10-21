import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    age!: number;

    @Column()
    password!: string;

    @Column()
    salt!: string;

    @ManyToMany(() => Role, {
        cascade: true,
        eager: true,
    })
    @JoinTable()
    roles!: Role[];
}
