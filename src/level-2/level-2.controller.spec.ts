import { Test, TestingModule } from '@nestjs/testing';
import { Level2Controller } from './level-2.controller';

describe('Level2Controller', () => {
  let controller: Level2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Level2Controller],
    }).compile();

    controller = module.get<Level2Controller>(Level2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
