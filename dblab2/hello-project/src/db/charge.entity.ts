import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import TaskmasterEntity from './taskmaster.entity';


@Entity()
export default class ChargeEntity extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    security_code: string;

    @Column({ length: 100 })
    bank_name: string;

    @Column()
    amount: number;

    @Column({ length: 15 })
    date_issued: string;

    // n:1 relation with taskmaster
    @ManyToOne((type) => TaskmasterEntity, (taskmaster) => taskmaster.charges)
    taskmaster: TaskmasterEntity;

}