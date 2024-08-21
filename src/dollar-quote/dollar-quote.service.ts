import { Injectable } from '@nestjs/common'
import { CreateDollarQuoteDto } from './dto/create-dollar-quote.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { DollarQuote } from './entities/dollar-quote.entity'
import { Repository } from 'typeorm'

@Injectable()
export class DollarQuoteService {
  constructor(
    @InjectRepository(DollarQuote) private readonly dollarQuoteRepository: Repository<DollarQuote>
  ) { }

  async saveQuote(createDollarQuoteDto: CreateDollarQuoteDto) {
    const dollarQuoteData = this.dollarQuoteRepository.create(createDollarQuoteDto)
    const savedEntity = await this.dollarQuoteRepository.save(dollarQuoteData)
    return { official: savedEntity.official, blue: savedEntity.blue }
  }

  async findQuote() {
    const quote = await this.dollarQuoteRepository.find()
    return { official: quote[0].official, blue: quote[0].blue }
  }
}
