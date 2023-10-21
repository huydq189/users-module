import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from '../constants/roles';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: ROLES;

    @Column({ nullable: true })
    description!: string;
}
