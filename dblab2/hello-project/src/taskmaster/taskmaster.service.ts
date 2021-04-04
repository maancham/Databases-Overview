import { Injectable } from '@nestjs/common';
import CreateTaskmasterDto from '../jobseekers/dto/create-taskmaster.dto';
import CreateProjectDto from '../jobseekers/dto/create-project.dto';
import CreateChargeDto from '../jobseekers/dto/create-charge.dto';
import TaskmasterEntity from '../db/taskmaster.entity';
import ChargeEntity from '../db/charge.entity';
import ProjectEntity from '../db/project.entity';
import { HttpException, HttpStatus } from '@nestjs/common';


@Injectable()
export class TaskmasterService {

    // creating a taskmaster:
    async insertTaskmaster(taskmasterDetails: CreateTaskmasterDto): Promise<TaskmasterEntity> {
        const { name , mail , password, phone, picture, chargeIDs, projectIDs } = taskmasterDetails;
        const taskmaster = new TaskmasterEntity();
        taskmaster.name = name;
        taskmaster.mail = mail;
        taskmaster.password = password;
        taskmaster.phone = phone;
        taskmaster.picture = picture;
        taskmaster.charges = [];
        taskmaster.projects = [];

        for (let i = 0; i < chargeIDs.length ; i++)
        {
            const charge = await ChargeEntity.findOne(chargeIDs[i]);
            taskmaster.charges.push(charge);
        }
        for (let i = 0; i < projectIDs.length ; i++)
        {
            const project = await ProjectEntity.findOne(projectIDs[i]);
            taskmaster.projects.push(project);
        }

        await taskmaster.save();
        return taskmaster;
      }

    
      // searching for a specific taskmaster:
      async getTaskmaster(id: number): Promise<TaskmasterEntity> {
          const taskmaster = await TaskmasterEntity.findOne(id);
          if (!taskmaster?.id) {
            throw new HttpException('Taskmaster not found!', HttpStatus.BAD_REQUEST);
          }
          return taskmaster;
      }

      // deleting a taskmaster:
      async deleteTaskmaster(id: number): Promise<any> {
        const taskmaster = await TaskmasterEntity.findOne(id);
        if (!taskmaster?.id) {
          throw new HttpException('Taskmaster not found!', HttpStatus.BAD_REQUEST);
        }
        return await TaskmasterEntity.delete({ id });
      }

      //////////////////////////////////////////////////////////////////////////////////////////////////////

      // createing a project:
      async insertProject(id: number, project: CreateProjectDto): Promise<ProjectEntity> {
        const taskmaster = await TaskmasterEntity.findOne(id);
        if (!taskmaster?.id) {
            throw new HttpException('Taskmaster not found!', HttpStatus.BAD_REQUEST);
        }
        const { name, priority, type, information, initial_price, initial_deadline, min_experience, taskmasterID} = project;
        const new_project = new ProjectEntity();
        new_project.name = name;
        new_project.priority = priority;
        new_project.type = type;
        new_project.information = information;
        new_project.initial_price = initial_price;
        new_project.initial_deadline = initial_deadline;
        new_project.min_experience = min_experience;
        new_project.taskmaster = taskmaster;

        await new_project.save();
        return new_project;
      }

      // searching for a specific project:
      async getProject(id: number, pid: number): Promise<ProjectEntity> {
        const taskmaster = await TaskmasterEntity.findOne(id);
        if (!taskmaster?.id) {
            throw new HttpException('Taskmaster not found!', HttpStatus.BAD_REQUEST);
        }
        const project = await ProjectEntity.findOne({where: { id: pid }, relations: ['taskmaster']});
        if (!project?.id) {
            throw new HttpException('Project not found!', HttpStatus.BAD_REQUEST);
        }
        if (project.taskmaster?.id != id) {
            throw new HttpException('Action not allowed!', HttpStatus.FORBIDDEN);
        }
        else {
            return project;
        }
      }

      // updating properties of a specific project:
      async updateProject(id: number, pid: number, project: CreateProjectDto): Promise<any> {
        await this.getProject(id, pid);
        const { taskmasterID, ...project_fields} = project;
        return ProjectEntity.update({ id: pid }, project_fields);
      }
      
      // deleting a project:
      async deleteProject(id: number, pid: number): Promise<any> {
        await this.getProject(id, pid);
        return await ProjectEntity.delete({ id: pid });
      }
      
}
