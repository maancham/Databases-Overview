import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import ChargeEntity from './charge.entity';
import ProjectEntity from './project.entity';


@Entity()
export default class TaskmasterEntity extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column({ length: 50 })
    mail: string;

    @Column({ length: 50 })
    password: string;

    @Column({ length: 15 })
    phone: string;

    @Column({ length: 100 })
    picture: string;

    // 1:n relation with charges
    @OneToMany((type) => ChargeEntity, (charge) => charge.taskmaster)
    charges: ChargeEntity[];

    // 1:n relation with projects
    @OneToMany((type) => ProjectEntity, (project) => project.taskmaster)
    projects: ProjectEntity[];

}