import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { config as dotenvConfig } from 'dotenv'
import { IS_PUBLIC_KEY } from 'src/shared/decorators/public'

dotenvConfig()

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) return true

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('Authentication token is required')
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET_KEY
        }
      )
      request['user'] = payload
    } catch {
      throw new UnauthorizedException('Authentication token is invalid')
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization']
    const [type, token] = authHeader ? authHeader.split(' ') : []
    return type === 'Bearer' ? token : undefined
  }
}
