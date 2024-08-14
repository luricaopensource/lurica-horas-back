import { Module } from '@nestjs/common'
import { ReportsService } from './reports.service'
import { ReportsController } from './reports.controller'
import { PrinterModule } from 'src/printer/printer.module'
import { ProjectsModule } from 'src/projects/projects.module'
import { UsersModule } from 'src/users/users.module'
import { ClientModule } from 'src/client/client.module'
import { TasksModule } from 'src/tasks/tasks.module'
import { MilestoneModule } from 'src/milestone/milestone.module'

@Module({
    controllers: [ReportsController],
    providers: [ReportsService],
    imports: [PrinterModule, ProjectsModule, UsersModule, ClientModule, TasksModule, MilestoneModule]
})
export class ReportsModule { }
