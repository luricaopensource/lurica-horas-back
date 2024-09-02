import { Test, TestingModule } from '@nestjs/testing';
import { UsersAmountsService } from './users_amounts.service';

describe('UsersAmountsService', () => {
  let service: UsersAmountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersAmountsService],
    }).compile();

    service = module.get<UsersAmountsService>(UsersAmountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
