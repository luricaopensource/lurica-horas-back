import { HttpException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { IsNull, Repository } from 'typeorm'

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client) private readonly clientRepository: Repository<Client>) { }

  create(createClientDto: CreateClientDto): Promise<Client> {
    const clientData = this.clientRepository.create(createClientDto)
    return this.clientRepository.save(clientData);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({where: {deletedAt: IsNull()}});
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) { throw new HttpException(`Client not found`, 404) }
    return client;
  }

  async findOneByName(name: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { name } });
    if (!client) { throw new HttpException(`Client ${name} not found`, 404) }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    const clientData = this.clientRepository.merge(client, updateClientDto);
    return await this.clientRepository.save(clientData);
  }

  async remove(id: number): Promise<Client> {
    const client = await this.findOne(id);
    client.deletedAt = new Date();

    return await this.clientRepository.save(client);
  }
}
