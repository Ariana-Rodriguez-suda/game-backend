import { Test, TestingModule } from '@nestjs/testing';
import { Level2Service } from './level-2.service';

describe('Level2Service', () => {
  let service: Level2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Level2Service],
    }).compile();

    service = module.get<Level2Service>(Level2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
