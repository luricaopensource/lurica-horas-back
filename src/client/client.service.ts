import { HttpException, Injectable, Logger } from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Client } from './entities/client.entity'
import { IsNull, Repository } from 'typeorm'
import { CompaniesService } from 'src/companies/companies.service'
import { AllClientsDTO } from './dto/client.dto'
import { ProjectDTO } from 'src/projects/dto/project.dto'
import { getCurrency } from 'src/shared/helpers/getCurrency'
import { MilestoneDTO } from 'src/milestone/dto/milestone.dto'

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly companyService: CompaniesService
  ) { }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const company = await this.companyService.findOne(createClientDto.companyId)

    const clientData = this.clientRepository.create(createClientDto)

    clientData.name = createClientDto.name
    clientData.company = company


    return this.clientRepository.save(clientData)
  }

  async findAll(): Promise<AllClientsDTO[]> {
    const clients = await this.clientRepository.find({ where: { deletedAt: IsNull() }, relations: ['projects'] })

    return clients.map<AllClientsDTO>(client => ({
      id: client.id,
      name: client.name,
      projects: client.projects.map<ProjectDTO>(project => ({
        id: project.id,
        name: project.name,
        currency: getCurrency(project.currency),
        amount: project.amount,
        milestones: project.milestones.map<MilestoneDTO>(milestone => ({
          id: milestone.id,
          date: milestone.date,
          name: milestone.name,
          amountPercentage: milestone.amountPercentage
        }))
      }))
    }))
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id })
    if (!client) { throw new HttpException(`Cliente no encontrado.`, 404) }
    return client
  }

  async findOneByName(name: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { name } })
    if (!client) { throw new HttpException(`Cliente ${name} no encontrado.`, 404) }
    return client
  }

  async findOneWithProjects(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['projects'],
    })

    if (!client) { throw new HttpException(`Cliente no encontrado.`, 404) }

    return client
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id)

    const clientData = this.clientRepository.merge(client, updateClientDto)
    return await this.clientRepository.save(clientData)
  }

  async remove(id: number): Promise<Client> {
    const client = await this.findOne(id)
    client.deletedAt = new Date()

    return await this.clientRepository.save(client)
  }
}
