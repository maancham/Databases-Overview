import { Injectable } from '@nestjs/common';
import CreateFreelancerDto from '../jobseekers/dto/create-freelancer.dto';
import CreateRequestDto from '../jobseekers/dto/create-request.dto';
import FreelancerEntity from '../db/freelancer.entity';
import RequestEntity from '../db/request.entity';
import ProjectEntity from '../db/project.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class FreelancerService {

    // creating a freelancer:
    async postFreelancer(freelancerDetails: CreateFreelancerDto): Promise<FreelancerEntity> {
            const { name , mail , password, phone, picture, past_roles, education, requestIDs } = freelancerDetails;
            const freelancer = new FreelancerEntity();
            freelancer.name = name;
            freelancer.mail = mail;
            freelancer.password = password;
            freelancer.phone = phone;
            freelancer.picture = picture;
            freelancer.past_roles = past_roles;
            freelancer.education = education;
            freelancer.requests = []

            for (let i = 0; i < requestIDs.length ; i++)
            {
                const request = await RequestEntity.findOne(requestIDs[i]);
                freelancer.requests.push(request);
            }

            await freelancer.save();
            return freelancer;
        }

    
        // searching for a specific freelancer:
        async getFreelancer(id: number): Promise<FreelancerEntity> {
            const freelancer = await FreelancerEntity.findOne(id);
            if (!freelancer?.id) {
            throw new HttpException('Freelancer not found!', 404);
            }
            return freelancer;
        }

        //getting all freelancer inside the system:
        async getAllFreelancers(): Promise<FreelancerEntity[]> {
            return FreelancerEntity.find();
        }

        // updating properties of a specific freelancer:
        async updateFreelancer(id: number, freelancer: CreateFreelancerDto): Promise<any> {
            await this.getFreelancer(id);
            const { requestIDs, ...freelancer_fields} = freelancer;
            return FreelancerEntity.update({ id: id }, freelancer_fields);
        }

        // deleting a freelancer:
        async deleteFreelancer(id: number): Promise<any> {
            const freelancer = await FreelancerEntity.findOne(id);
            if (!freelancer?.id) {
                throw new HttpException('Freelancer not found!', 404);
            }
            return await FreelancerEntity.delete({ id });
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////
      
      // createing a request:
      async addrequest(id: number, pid: number, request: CreateRequestDto): Promise<RequestEntity> {
        const freelancer = await FreelancerEntity.findOne(id);
        if (!freelancer?.id) {
            throw new HttpException('Freelancer not found!', 404);
        }
        const project = await ProjectEntity.findOne(pid);
        if (!project?.id) {
            throw new HttpException('Project not found!', 404);
        }
        
        const { header, description, new_price, date_created, new_deadline, freelancerID, projectID} = request;
        const new_request = new RequestEntity();
        new_request.header = header;
        new_request.description = description;
        new_request.new_price = new_price;
        new_request.date_created = date_created;
        new_request.new_deadline = new_deadline;
        new_request.freelancer = freelancer;
        new_request.project = project;

        await new_request.save();
        return new_request;
      }

    // searching for a specific request:
    async getrequest(id: number, rid: number): Promise<RequestEntity> {
        const freelancer = await FreelancerEntity.findOne(id);
        if (!freelancer?.id) {
            throw new HttpException('freelancer not found!', 404);
        }
        const request = await RequestEntity.findOne({where: { id: rid }, relations: ['freelancer']});
        if (!request?.id) {
            throw new HttpException('request not found!', 404);
        }
        if (request.freelancer?.id != id) {
            throw new HttpException('Action not allowed!', HttpStatus.FORBIDDEN);
        }
        else {
            return request;
        }
    }

    // returning all requests:
    async getAllrequests(id: number): Promise<RequestEntity[]> {
        const freelancer = await FreelancerEntity.findOne(id);
        if (!freelancer?.id) {
            throw new HttpException('freelancer not found!', 404);
        }
        const freelancer_obj = await FreelancerEntity.findOne({where: { id: id }, relations: ['requests']});
        return freelancer_obj.requests;
    }

    
    // updating properties of a specific request:
    async updateRequest(id: number, rid: number, request: CreateRequestDto): Promise<any> {
        await this.getrequest(id, rid);
        const { freelancerID, projectID, ...request_fields} = request;
        return RequestEntity.update({ id: rid }, request_fields);
    }

    // deleting a request:
    async deleteRequest(id: number, rid: number): Promise<any> {
        await this.getrequest(id, rid);
        return await RequestEntity.delete({ id: rid });
    }

}
