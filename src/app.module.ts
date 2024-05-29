import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TasksModule } from './tasks/tasks.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { dataSourceOptions } from 'db/data-source'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ProjectsModule } from './projects/projects.module';
import { CompanyModule } from './company/company.module';
import { MilestoneModule } from './milestone/milestone.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: () => dataSourceOptions }),
    TasksModule,
    UsersModule,
    AuthModule,
    ProjectsModule,
    CompanyModule,
    MilestoneModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule { }
