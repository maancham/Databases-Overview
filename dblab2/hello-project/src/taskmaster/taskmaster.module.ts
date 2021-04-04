import { Module } from '@nestjs/common';
import { TaskmasterService } from './taskmaster.service';
import { TaskmasterController } from './taskmaster.controller';

@Module({
  providers: [TaskmasterService],
  controllers: [TaskmasterController]
})
export class TaskmasterModule {}
