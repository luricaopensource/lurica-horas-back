import { HttpException, Inject, Injectable, Logger, Scope } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { IsNull, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { REQUEST } from '@nestjs/core'

@Injectable({scope: Scope.REQUEST})
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(REQUEST)
    private readonly request: Request,
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
    if (!user) { throw new HttpException(`Usuario no encontrado`, 404) }
    return user
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } })
    if (!user) { throw new HttpException(`Usuario ${username} no encontrado`, 404) }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)

    const userData = this.usersRepository.merge(user, updateUserDto)
    return await this.usersRepository.save(userData)
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id)
    user.deletedAt = new Date()

    return await this.usersRepository.save(user)
  }

  async getUserFromBearerToken(): Promise<any> {
    Logger.log(this.request);
    // const user = request['user'];

    // return await this.findOneByUsername(user.username);

    }


}