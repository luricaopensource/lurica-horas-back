import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TasksModule } from './tasks/tasks.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { dataSourceOptions } from 'db/data-source'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot(dataSourceOptions),
    TasksModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule { }
