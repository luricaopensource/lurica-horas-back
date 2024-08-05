import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ClientService } from './client.service'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { Client } from './entities/client.entity'
import { AllClientsDTO } from './dto/client.dto'

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto)
  }

  @Get()
  findAll(): Promise<AllClientsDTO[]> {
    return this.clientService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(+id)
  }

  @Get(':name')
  findOneByName(@Param('name') name: string): Promise<Client> {
    return this.clientService.findOneByName(name)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto): Promise<Client> {
    return this.clientService.update(+id, updateClientDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Client> {
    return this.clientService.remove(+id)
  }
}
