import { Module } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { ProjectsController } from './projects.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientModule } from 'src/client/client.module'
import { Project } from './entities/project.entity'
import { UsersToProjects } from 'src/users_to_projects/users_to_projects.entity'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Project, UsersToProjects]), ClientModule, UsersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule { }
