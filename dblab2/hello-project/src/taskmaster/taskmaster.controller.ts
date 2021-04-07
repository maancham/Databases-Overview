import { Body, Controller, Get, ParseIntPipe, Post, Put, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import CreateTaskmasterDto from '../jobseekers/dto/create-taskmaster.dto';
import CreateProjectDto from '../jobseekers/dto/create-project.dto';
import CreateChargeDto from '../jobseekers/dto/create-charge.dto';
import { TaskmasterService } from './taskmaster.service';
import { ApiResponse } from '@nestjs/swagger';


@Controller('taskmaster')
export class TaskmasterController {
    constructor(private readonly taskmasterServices: TaskmasterService) {}

    //'postTaskmaster()' will handle the creating of new Taskmaster
    @Post('post')
    postTaskmaster(@Body() taskmaster: CreateTaskmasterDto) {
        return this.taskmasterServices.insertTaskmaster(taskmaster);
    }

    // getTaskmaster() will return a taskmaster designated by id
    @Get(':id')
    getTaskmaster(@Param('id') id: number) {
      return this.taskmasterServices.getTaskmaster(id);
    }

    // getAllTaskmasters() will return all taskmasters in system:
    @Get()
    async getAllTaskmasters() {
      return this.taskmasterServices.getAllTaskmasters();
    }

    // deleteTaskmaster() will delete a taskmaster designated by id
    @Delete(':id')
    deleteTaskmaster(@Param('id') id: number) {
      return this.taskmasterServices.deleteTaskmaster(id);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // addProject() will create a new project by a taskmaster
    @Post(':id/projects')
    addProject(@Param('id') id: number, @Body() project: CreateProjectDto) {
      if (id != project.taskmasterID) {
        throw new HttpException('IDs do not match', HttpStatus.FORBIDDEN);
      }
      return this.taskmasterServices.insertProject(id, project);
    }

    // getProject() return a project designated by id 
    @Get(':id/projects/:pid')
    getProject(@Param('id') id: number, @Param('pid') pid: number) {
      return this.taskmasterServices.getProject(id, pid);
    }

    // getAllprojects() return all projects for a taskmaster:
    @Get(':id/projects')
    getAllprojects(@Param('id') id: number) {
      return this.taskmasterServices.getAllprojects(id);
    }

    // updateProject() will change properties of a project:
    @Put(':id/projects/:pid')
    updateProject(@Param('id') id: number, @Param('pid') pid: number, @Body() project: CreateProjectDto) {
      if (id != project.taskmasterID) {
        throw new HttpException('IDs do not match', HttpStatus.FORBIDDEN);
      }  
      return this.taskmasterServices.updateProject(id, pid, project);
    }

    // deleteProject() will delete a project:
    @Delete(':id/projects/:pid')
    deleteProject(@Param('id') id: number, @Param('pid') pid: number) {
      return this.taskmasterServices.deleteProject(id, pid);
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // addCharge() will create a new charge by a taskmaster
    @Post(':id/charges')
    addCharge(@Param('id') id: number, @Body() charge: CreateChargeDto) {
      if (id != charge.taskmasterID) {
        throw new HttpException('IDs do not match', HttpStatus.FORBIDDEN);
      }
      return this.taskmasterServices.insertCharge(id, charge);
    }

    // getCharge() return a charge designated by id 
    @Get(':id/charges/:cid')
    getCharge(@Param('id') id: number, @Param('cid') cid: number) {
      return this.taskmasterServices.getCharge(id, cid);
    }

    // getAllcharges() return all charges for a taskmaster:
    @Get(':id/charges')
    getAllcharges(@Param('id') id: number) {
      return this.taskmasterServices.getAllcharges(id);
    }

    // updateCharge() will change properties of a charge:
    @Put(':id/charges/:cid')
    updateCharge(@Param('id') id: number, @Param('cid') cid: number, @Body() charge: CreateChargeDto) {
      if (id != charge.taskmasterID) {
        throw new HttpException('IDs do not match', HttpStatus.FORBIDDEN);
      }  
      return this.taskmasterServices.updateCharge(id, cid, charge);
    }

    // deleteCharge() will delete a charge:
    @Delete(':id/charges/:cid')
    deleteCharge(@Param('id') id: number, @Param('cid') cid: number) {
      return this.taskmasterServices.deleteCharge(id, cid);
    }
}
