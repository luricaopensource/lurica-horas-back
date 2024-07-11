import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { Task } from './entities/task.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from 'src/users/users.module'
import { MilestoneModule } from 'src/milestone/milestone.module'

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule, MilestoneModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }
