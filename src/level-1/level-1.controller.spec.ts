import { Test, TestingModule } from '@nestjs/testing';
import { Level1Controller } from './level-1.controller';

describe('LevelController', () => {
  let controller: Level1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Level1Controller],
    }).compile();

    controller = module.get<Level1Controller>(Level1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
