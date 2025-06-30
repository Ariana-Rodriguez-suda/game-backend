import { Test, TestingModule } from '@nestjs/testing';
import { Level3Service } from './level-3.service';

describe('Level3Service', () => {
  let service: Level3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Level3Service],
    }).compile();

    service = module.get<Level3Service>(Level3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
