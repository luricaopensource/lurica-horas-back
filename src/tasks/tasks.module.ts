import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { Task } from './entities/task.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from 'src/users/users.module'
import { MilestoneModule } from 'src/milestone/milestone.module'
import { ProjectsModule } from 'src/projects/projects.module'
import { DollarQuoteModule } from 'src/dollar-quote/dollar-quote.module'

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule, MilestoneModule, ProjectsModule, DollarQuoteModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule { }
