import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
// import { User } from './entities/user.entity'
// import { Repository } from 'typeorm'
// import { InjectRepository } from '@nestjs/typeorm'

// @Injectable()
export class UsersService {
  constructor(
    // @InjectRepository(User)
    // private readonly usersRepository: Repository<User>
  ) { }

  create(createUserDto: CreateUserDto): string {
    // const userData = this.usersRepository.create(createUserDto)

    // return this.usersRepository.save(userData)
    return `This action creates a user`
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
