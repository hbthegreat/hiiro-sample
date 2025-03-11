import { Test, TestingModule } from '@nestjs/testing';
import { HiiroService } from './hiiro.service';

describe('HiiroService', () => {
  let service: HiiroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HiiroService],
    }).compile();

    service = module.get<HiiroService>(HiiroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
