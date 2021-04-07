import { Body, Controller, Get, ParseIntPipe, Post, Put, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import CreateFreelancerDto from '../jobseekers/dto/create-freelancer.dto';
import CreateRequestDto from '../jobseekers/dto/create-request.dto';
import { FreelancerService } from './freelancer.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('freelancer')
export class FreelancerController {
    constructor(private readonly freelancerServices: FreelancerService) {}

    //'postFreelancer()' will handle the creating of new Freelancer
    @Post('post')
    postFreelancer(@Body() freelancer: CreateFreelancerDto) {
        return this.freelancerServices.postFreelancer(freelancer);
    }

    // getFreelancer() will return a Freelancer designated by id
    @Get(':id')
    getFreelancer(@Param('id') id: number) {
      return this.freelancerServices.getFreelancer(id);
    }

    // getAllFreelancers() will return all Freelancers in system:
    @Get()
    async getAllFreelancers() {
      return this.freelancerServices.getAllFreelancers();
    }

    
    @Put(':id')
    updateFreelancer(@Param('id') id: number,  @Body() freelancer: CreateFreelancerDto) {
      return this.freelancerServices.updateFreelancer(id, freelancer);
    }

    // deleteFreelancer() will delete a Freelancer designated by id
    @Delete(':id')
    deleteFreelancer(@Param('id') id: number) {
      return this.freelancerServices.deleteFreelancer(id);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // addrequest() will create a new request by a freelancer
    @Post(':id/requests')
    addrequest(@Param('id') id: number, @Param('pid') pid: number, @Body() request: CreateRequestDto) {
      if (id != request.freelancerID) {
        throw new HttpException('FreelancerIDs do not match', HttpStatus.FORBIDDEN);
      }
      if (pid != request.projectID) {
        throw new HttpException('ProjectIDs do not match', HttpStatus.FORBIDDEN);
      }
      return this.freelancerServices.addrequest(id, pid, request);
    }

    // getrequest() return a request designated by id 
    @Get(':id/requests/:rid')
    getrequest(@Param('id') id: number, @Param('rid') rid: number) {
      return this.freelancerServices.getrequest(id, rid);
    }

    // getAllrequests() return all requests for a freelancer:
    @Get(':id/requests')
    getAllrequests(@Param('id') id: number) {
      return this.freelancerServices.getAllrequests(id);
    }

    // // updateCharge() will change properties of a charge:
    // @Put(':id/charges/:cid')
    // updateCharge(@Param('id') id: number, @Param('cid') cid: number, @Body() charge: CreateChargeDto) {
    //   if (id != charge.taskmasterID) {
    //     throw new HttpException('IDs do not match', HttpStatus.FORBIDDEN);
    //   }  
    //   return this.taskmasterServices.updateCharge(id, cid, charge);
    // }

    // // deleteCharge() will delete a charge:
    // @Delete(':id/charges/:cid')
    // deleteCharge(@Param('id') id: number, @Param('cid') cid: number) {
    //   return this.taskmasterServices.deleteCharge(id, cid);
    // }

}
