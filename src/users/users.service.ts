import { HttpException, Inject, Injectable, Logger, Scope } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { IsNull, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDTO } from './dto/user.dto'
import { REQUEST } from '@nestjs/core'

export interface UserResponse {
  id: number
}


@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) { }


  getCurrencies(id: number): string {
    const currencies = ['ARS', 'USD']
    return currencies[id]
  }

  getRoles(id: number): string {
    const roles = ['Administrador', 'Consultor', 'Empleado']
    return roles[id]
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const userData = this.userRepository.create(createUserDto)

    return this.userRepository.save(userData)
  }

  async findAll(): Promise<UserDTO[]> {
    const users: User[] = await this.userRepository.find({ where: { deletedAt: IsNull() } })

    return users.map((user: User) => {
      const userDTO: UserDTO = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: this.getRoles(user.role),
        currency: this.getCurrencies(user.currency),
        hourlyAmount: user.hourlyAmount,
        monthlyAmount: user.monthlyAmount
      }

      return userDTO
    })
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) { throw new HttpException(`Usuario no encontrado`, 404) }
    return user
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } })
    if (!user) { throw new HttpException(`Usuario ${username} no encontrado`, 404) }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDTO> {
    const user = await this.findOne(id)
    const userSaved = await this.userRepository.save({ ...user, ...updateUserDto })
    return {
      id: userSaved.id,
      firstName: userSaved.firstName,
      lastName: userSaved.lastName,
      username: userSaved.username,
      email: userSaved.email,
      role: this.getRoles(userSaved.role),
      currency: this.getCurrencies(userSaved.currency),
      hourlyAmount: userSaved.hourlyAmount,
      monthlyAmount: userSaved.monthlyAmount
    }
  }

  async remove(id: number): Promise<UserDTO> {
    const user = await this.findOne(id)
    const deletedUser = await this.userRepository.save({ ...user, deletedAt: new Date() })
    return {
      id: deletedUser.id,
      firstName: deletedUser.firstName,
      lastName: deletedUser.lastName,
      username: deletedUser.username,
      email: deletedUser.email,
      role: this.getRoles(deletedUser.role),
      currency: this.getCurrencies(deletedUser.currency),
      hourlyAmount: deletedUser.hourlyAmount,
      monthlyAmount: deletedUser.monthlyAmount
    }
  }

  async getUserFromBearerToken(): Promise<UserDTO> {
    const userId = this.request['user'].sub

    const user = await this.findOne(userId)
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: this.getRoles(user.role),
      currency: this.getCurrencies(user.currency),
      hourlyAmount: user.hourlyAmount,
      monthlyAmount: user.monthlyAmount
    }
  }
}