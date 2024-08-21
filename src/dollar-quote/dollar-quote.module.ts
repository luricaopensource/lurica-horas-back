import { Module } from '@nestjs/common'
import { DollarQuoteService } from './dollar-quote.service'
import { DollarQuoteController } from './dollar-quote.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DollarQuote } from './entities/dollar-quote.entity'

@Module({
  imports: [TypeOrmModule.forFeature([DollarQuote])],
  controllers: [DollarQuoteController],
  providers: [DollarQuoteService],
  exports: [DollarQuoteService]
})
export class DollarQuoteModule { }
