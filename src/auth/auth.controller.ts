import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { Public } from 'src/shared/decorators/public'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto)
  }

  @Public()
  @Post('register')
  register(@Body() registerAuthDto: CreateUserDto) {
    return this.authService.register(registerAuthDto)
  }
}
