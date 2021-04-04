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

    // error codes to be added!
    // getTaskmaster() will return a taskmaster designated by id
    @Get(':id')
    getTaskmaster(@Param('id') id: number) {
      return this.taskmasterServices.getTaskmaster(id);
    }

    // deleteTaskmaster() will delete a taskmaster designated by id
    @Delete(':id')
    deleteTaskmaster(@Param('id') id: number) {
      return this.taskmasterServices.deleteTaskmaster(id);
    }


    // addProject() will create a new project by a taskmaster
    @Post(':id/projects')
    addProject(@Param('id') id: number, @Body() project: CreateProjectDto) {
      if (id != project.taskmasterID) {
        throw new HttpException('IDs do not match', HttpStatus.BAD_REQUEST);
      }
      return this.taskmasterServices.insertProject(id, project);
    }

    // getProject() return a project designated by id 
    @Get(':id/projects/:pid')
    getProject(@Param('id') id: number, @Param('pid') pid: number) {
      return this.taskmasterServices.getProject(id, pid);
    }

    // updateProject() will change properties of a project:
    @Put(':id/projects/:pid')
    updateProject(@Param('id') id: number, @Param('pid') pid: number, @Body() project: CreateProjectDto) {
      if (id != project.taskmasterID) {
        throw new HttpException('IDs do not match', HttpStatus.BAD_REQUEST);
      }  
      return this.taskmasterServices.updateProject(id, pid, project);
    }

    // deleteProject() will delete a project:
    @Delete(':id/projects/:pid')
    deleteProject(@Param('id') id: number, @Param('pid') pid: number) {
      return this.taskmasterServices.deleteProject(id, pid);
    }
  
}
