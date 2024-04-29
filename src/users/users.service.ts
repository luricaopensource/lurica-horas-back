import { HttpException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { IsNull, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  create(createUserDto: CreateUserDto): Promise<User> {
    const userData = this.usersRepository.create(createUserDto)

    return this.usersRepository.save(userData)
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ where: { deletedAt: IsNull() } })
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id })
    if (!user) { throw new HttpException(`User with id ${id} not found`, 404) }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)
    if (!user) { throw new HttpException(`User with id ${id} not found`, 404) }

    const userData = this.usersRepository.merge(user, updateUserDto)
    return await this.usersRepository.save(userData)
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id)
    if (!user) { throw new HttpException(`User with id ${id} not found`, 404) }
    user.deletedAt = new Date()

    return await this.usersRepository.save(user)
  }
}