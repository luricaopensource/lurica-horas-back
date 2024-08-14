import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Req,
  Logger,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserDTO } from './dto/user.dto'
import { IResponse } from 'src/shared/interfaces/response'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserDTO[]> {
    return this.usersService.findAll()
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
    return this.usersService.create(createUserDto)
  }

  @Get('/current')
  getUserFromBearerToken(): Promise<UserDTO> {
    return this.usersService.getUserFromBearerToken()
  }

  @Get('/employees')
  getEmployees(): Promise<UserDTO[]> {
    return this.usersService.findAllEmployees()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IResponse> {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse> {
    return this.usersService.remove(+id)
  }
}
