import { Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginAuthDto } from './dto/login-auth.dto'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { ILoginData } from './entities/login-data.entity'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { IResponse } from 'src/shared/interfaces/response'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async login(loginAuthDto: LoginAuthDto): Promise<ILoginData> {
    const user = await this.userService.findOneByUsername(loginAuthDto.username)

    if (user.password !== loginAuthDto.password) {
      throw new UnauthorizedException('Credenciales inválidas.')
    }

    await this.userService.saveLastLogin(user.id)

    const payload = { email: user.email, username: user.username, sub: user.id }

    return { access_token: await this.jwtService.signAsync(payload) }
  }

  register(registerAuthDto: CreateUserDto): Promise<IResponse> {
    return this.userService.create(registerAuthDto)
  }
}
