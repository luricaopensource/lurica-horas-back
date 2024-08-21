import { Test, TestingModule } from '@nestjs/testing';
import { DollarQuoteService } from './dollar-quote.service';

describe('DollarQuoteService', () => {
  let service: DollarQuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DollarQuoteService],
    }).compile();

    service = module.get<DollarQuoteService>(DollarQuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
