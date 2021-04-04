import { Test, TestingModule } from '@nestjs/testing';
import { TaskmasterController } from './taskmaster.controller';

describe('TaskmasterController', () => {
  let controller: TaskmasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskmasterController],
    }).compile();

    controller = module.get<TaskmasterController>(TaskmasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
