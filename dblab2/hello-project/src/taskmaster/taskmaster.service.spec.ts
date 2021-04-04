import { Test, TestingModule } from '@nestjs/testing';
import { TaskmasterService } from './taskmaster.service';

describe('TaskmasterService', () => {
  let service: TaskmasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskmasterService],
    }).compile();

    service = module.get<TaskmasterService>(TaskmasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
