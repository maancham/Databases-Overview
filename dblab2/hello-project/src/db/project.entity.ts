import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import TaskmasterEntity from './taskmaster.entity';
import RequestEntity from './request.entity';


@Entity()
export default class ProjectEntity extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    priority: string;

    @Column({ length: 20 })
    type: string;

    @Column({ length: 500 })
    information: string;

    @Column()
    initial_price: number;

    @Column({ length: 15 })
    initial_deadline: string;

    @Column({ length: 500 })
    min_experience: string;

    // n:1 relation with taskmaster
    @ManyToOne((type) => TaskmasterEntity, (taskmaster) => taskmaster.projects)
    taskmaster: TaskmasterEntity;

    // 1:n relation with requests
    @OneToMany((type) => RequestEntity, (request) => request.project)
    requests: RequestEntity[];

}