import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { DollarQuoteService } from './dollar-quote.service'
import { CreateDollarQuoteDto } from './dto/create-dollar-quote.dto'

@Controller('dollar-quote')
export class DollarQuoteController {
  constructor(private readonly dollarQuoteService: DollarQuoteService) { }

  @Post()
  create(@Body() createDollarQuoteDto: CreateDollarQuoteDto) {
    return this.dollarQuoteService.saveQuote(createDollarQuoteDto)
  }

  @Get()
  getQuote() {
    return this.dollarQuoteService.findQuote()
  }
}
