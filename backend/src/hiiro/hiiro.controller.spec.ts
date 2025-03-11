import { Test, TestingModule } from '@nestjs/testing';
import { HiiroController } from './hiiro.controller';

describe('HiiroController', () => {
  let controller: HiiroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HiiroController],
    }).compile();

    controller = module.get<HiiroController>(HiiroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
