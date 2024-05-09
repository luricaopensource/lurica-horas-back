import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  await app.listen(process.env.API_PORT || 3000)
}
bootstrap()
