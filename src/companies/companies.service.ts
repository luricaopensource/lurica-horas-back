import { Injectable } from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { Company } from './entities/company.entity'
import { IsNull, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CompaniesService {

  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>) { }

  create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const companyData = this.companyRepository.create(createCompanyDto)
    return this.companyRepository.save(companyData)
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find({ where: { deletedAt: IsNull() } })
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOneBy({ id })
    return company
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id)

    const companyData = this.companyRepository.merge(company, updateCompanyDto)
    return await this.companyRepository.save(companyData)
  }

  async remove(id: number): Promise<Company> {
    const company = await this.findOne(id)
    company.deletedAt = new Date()

    return await this.companyRepository.save(company)
  }
}
