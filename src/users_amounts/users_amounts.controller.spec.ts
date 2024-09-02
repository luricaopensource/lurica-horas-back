import { Test, TestingModule } from '@nestjs/testing';
import { UsersAmountsController } from './users_amounts.controller';
import { UsersAmountsService } from './users_amounts.service';

describe('UsersAmountsController', () => {
  let controller: UsersAmountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersAmountsController],
      providers: [UsersAmountsService],
    }).compile();

    controller = module.get<UsersAmountsController>(UsersAmountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
