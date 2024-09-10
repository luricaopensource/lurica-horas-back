import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UsersToProjects } from 'src/users_to_projects/users_to_projects.entity'
import { Project } from 'src/projects/entities/project.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersToProjects, Project])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
