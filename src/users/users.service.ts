import { HttpException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { IsNull, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDTO } from './dto/user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
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
    const userData = this.usersRepository.create(createUserDto)

    return this.usersRepository.save(userData)
  }

  async findAll(): Promise<UserDTO[]> {
    const users: User[] = await this.usersRepository.find({ where: { deletedAt: IsNull() } })

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
}