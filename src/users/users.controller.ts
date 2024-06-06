import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { Public } from 'src/shared/decorators/public'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(+id)
  }

  @Public()
  @Get('current')
  getUserFromBearerToken(): Promise<any> {
    return this.usersService.getUserFromBearerToken();
  }

}
