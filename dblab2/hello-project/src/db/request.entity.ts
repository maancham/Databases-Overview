import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import FreelancerEntity from './freelancer.entity';
import ProjectEntity from './project.entity';



@Entity()
export default class RequestEntity extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    header: string;

    @Column({ length: 500 })
    description: string;

    @Column()
    new_price: number;

    @Column({ length: 15 })
    date_created: string;

    @Column({ length: 15 })
    new_deadline: string;

    // n:1 relation with freelancer
    @ManyToOne((type) => FreelancerEntity, (freelancer) => freelancer.requests)
    freelancer: FreelancerEntity;

    // n:1 relation with project
    @ManyToOne((type) => ProjectEntity, (project) => project.requests)
    project: ProjectEntity;

}