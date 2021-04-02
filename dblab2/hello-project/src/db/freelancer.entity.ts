import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import RequestEntity from './request.entity';



@Entity()
export default class FreelancerEntity extends BaseEntity 
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

    @Column({ length: 500 })
    past_roles: string;

    @Column({ length: 500 })
    education: string;

    // 1:n relation with requests
    @OneToMany((type) => RequestEntity, (request) => request.freelancer)
    requests: RequestEntity[];

}