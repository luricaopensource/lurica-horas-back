import { Test, TestingModule } from '@nestjs/testing';
import { DollarQuoteController } from './dollar-quote.controller';
import { DollarQuoteService } from './dollar-quote.service';

describe('DollarQuoteController', () => {
  let controller: DollarQuoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DollarQuoteController],
      providers: [DollarQuoteService],
    }).compile();

    controller = module.get<DollarQuoteController>(DollarQuoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
