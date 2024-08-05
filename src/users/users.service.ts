import { HttpException, Inject, Injectable, Logger, Scope } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { IsNull, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDTO } from './dto/user.dto'
import { REQUEST } from '@nestjs/core'
import { getCurrency } from 'src/shared/helpers/getCurrency'
import { getRole } from 'src/shared/helpers/getRole'
import { IResponse } from 'src/shared/interfaces/response'

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

  async create(createUserDto: CreateUserDto): Promise<IResponse> {
    const userData = this.userRepository.create(createUserDto)

    const savedUser = await this.userRepository.save(userData)

    return { id: savedUser.id }
  }

  async findAll(): Promise<UserDTO[]> {
    const users: User[] = await this.userRepository.find({ where: { deletedAt: IsNull() } })

    return users.map((user: User) => {
      if (!user.usersToCompanies) user.usersToCompanies = []

      const userDTO: UserDTO = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        roleName: getRole(user.role),
        currencyName: getCurrency(user.currency),
        hourlyAmount: user.hourlyAmount,
        monthlyAmount: user.monthlyAmount,
        companies: user.usersToCompanies.map((userToCompany) => {
          return {
            id: userToCompany.company.id,
            name: userToCompany.company.name
          }
        })
      }

      return userDTO
    })
  }

  async findOne(id: number, relations: string[] = []): Promise<User> {
    const options = relations.length ? { where: { id }, relations } : { where: { id } }

    const user = await this.userRepository.findOne(options)
    if (!user) { throw new HttpException(`Usuario no encontrado`, 404) }
    return user
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } })
    if (!user) { throw new HttpException(`Usuario ${username} no encontrado`, 404) }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<IResponse> {
    const user = await this.findOne(id)
    const savedUser = await this.userRepository.save({ ...user, ...updateUserDto })

    return { id: savedUser.id }
  }

  async remove(id: number): Promise<IResponse> {
    const user = await this.findOne(id)
    const deletedUser = await this.userRepository.save({ ...user, deletedAt: new Date() })

    return { id: deletedUser.id }
  }

  async getUserFromBearerToken(): Promise<UserDTO> {
    const userId = this.request['user'].sub

    const user = await this.findOne(userId)

    if (!user.usersToCompanies) user.usersToCompanies = []

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      roleName: getRole(user.role),
      currencyName: getCurrency(user.currency),
      hourlyAmount: user.hourlyAmount,
      monthlyAmount: user.monthlyAmount,
      companies: user.usersToCompanies.map((userToCompany) => {
        return {
          id: userToCompany.company.id,
          name: userToCompany.company.name
        }
      })
    }
  }
}