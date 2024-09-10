import { Injectable, Logger } from '@nestjs/common'
import { PrinterService } from 'src/printer/printer.service'
import { getSampleReport } from './sample-report.report'
import { getHoursReport } from './tasks.report'
import { GetReportBody } from './dto/get-report'
import { ProjectsService } from '../projects/projects.service'
import { UsersService } from 'src/users/users.service'
import { ClientService } from 'src/client/client.service'
import { Project } from 'src/projects/entities/project.entity'
import { User } from 'src/users/entities/user.entity'
import { Client } from 'src/client/entities/client.entity'
import { TasksService } from 'src/tasks/tasks.service'
import { Milestone } from 'src/milestone/entities/milestone.entity'
import { MilestoneService } from 'src/milestone/milestone.service'
import { CustomerStrategy } from './strategies/customer.strategy'
import { ContentStrategy } from './strategies/content-strategy.interface'
import { ContentGenerator } from './strategies/content-generator.strategy'
import { ProjectEmployeeStrategy } from './strategies/project-employee.strategy'
import { EmployeeCustomerStrategy } from './strategies/employee-customer.strategy'
import { ProjectStrategy } from './strategies/project.strategy'
import { EmployeeStrategy } from './strategies/employee.strategy'
import { DefaultGenerationStrategy } from './strategies/default.strategy'
import { DateFormatter } from 'src/helpers'

@Injectable()
export class ReportsService {
  constructor(
    private readonly printerService: PrinterService,
    private readonly projectService: ProjectsService,
    private readonly employeeService: UsersService,
    private readonly clientService: ClientService,
    private readonly tasksService: TasksService,
    private readonly milestoneService: MilestoneService
  ) { }

  createReport() {
    const docDefinition = getSampleReport({
      name: 'Report for Lurica Time Track App',
    })

    return this.printerService.createPdf(docDefinition)
  }

  async createHoursReport(
    requestBody: GetReportBody,
  ): Promise<PDFKit.PDFDocument> {
    const { dateFrom, dateTo, projectId, employeeId, customerId, milestoneId } = requestBody
    let subtitle = ''
    let strategy: ContentStrategy = null

    let project: Project | null = null
    let employee: User | null = null
    let customer: Client | null = null
    let milestone: Milestone | null = null

    if (projectId) {
      project = await this.projectService.findOne(projectId)
    }
    if (employeeId) {
      employee = await this.employeeService.findOne(employeeId, [
        'tasks',
        'tasks.project'
      ])
    }

    if (customerId) {
      customer = await this.clientService.findOneWithProjects(customerId)
    }
    if (milestoneId) {
      milestone = await this.milestoneService.findOne(milestoneId)
    }

    if (project) {
      subtitle += `Proyecto: ${project.name} \n`
    }
    if (employee) {
      subtitle += `Empleado: ${employee.firstName} ${employee.lastName} \n`
    }
    if (customer) {
      subtitle += `Cliente: ${customer.name} \n`
    }

    // TODO: Create two columns to show the subtitles

    if (milestone) {
      subtitle += `Hito: ${milestone.name} \n`
    }
    if (dateFrom) {
      const dateFromPlus1Day = new Date(dateFrom)
      dateFromPlus1Day.setDate(dateFromPlus1Day.getDate() + 1)
      subtitle += `Desde: ${DateFormatter.getDDMMYYYY(dateFromPlus1Day)} \n`
    }
    if (dateTo) {
      const dateToPlus1Day = new Date(dateTo)
      dateToPlus1Day.setDate(dateToPlus1Day.getDate() + 1)
      subtitle += `Hasta: ${DateFormatter.getDDMMYYYY(dateToPlus1Day)} \n`
    }

    if (project && employee) {
      strategy = new ProjectEmployeeStrategy(this.tasksService, project, employee)
    } else if (employee && customer) {
      strategy = new EmployeeCustomerStrategy(this.tasksService, customer, employee)
    } else if (project) {
      strategy = new ProjectStrategy(project)
    } else if (employee) {
      strategy = new EmployeeStrategy(employee)
    } else if (customer) {
      strategy = new CustomerStrategy(this.tasksService, customer)
    } else {
      strategy = new DefaultGenerationStrategy(this.tasksService)
    }

    const generator = new ContentGenerator(strategy)
    const { content, headers } = await generator.generate(dateFrom, dateTo)
    const docDefinition = getHoursReport(subtitle, content, headers)
    return this.printerService.createPdf(docDefinition)
  }
}
