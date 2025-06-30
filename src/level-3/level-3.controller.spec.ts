import { Test, TestingModule } from '@nestjs/testing';
import { Level3Controller } from './level-3.controller';

describe('Level3Controller', () => {
  let controller: Level3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Level3Controller],
    }).compile();

    controller = module.get<Level3Controller>(Level3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
