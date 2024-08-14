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
import { Task } from 'src/tasks/entities/task.entity'
import { DateFormatter } from 'src/helpers'
import { Milestone } from 'src/milestone/entities/milestone.entity'
import { MilestoneService } from 'src/milestone/milestone.service'

@Injectable()
export class ReportsService {
  constructor(
    private readonly printerService: PrinterService,
    private readonly projectService: ProjectsService,
    private readonly employeeService: UsersService,
    private readonly clientService: ClientService,
    private readonly tasksService: TasksService,
    private readonly milestoneService: MilestoneService
  ) {}

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
    let content = []
    let headers = []

    try {
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
          'tasks.project',
        ])
      }
      if (customerId) {
        customer = await this.clientService.findOneWithProjects(customerId)
      }
      if (milestoneId) {
        milestone = await this.milestoneService.findOne(milestoneId)
      }

      if (project) {
        subtitle += `Proyecto: ${project.name} `
      }
      if (employee) {
        subtitle += `Empleado: ${employee.firstName} `
      }
      if (customer) {
        subtitle += `Cliente: ${customer.name} `
      }
      if (milestone) {
        subtitle += `Hito: ${milestone.name} `
      }
      if (dateFrom) {
        subtitle += `Desde: ${dateFrom} `
      }
      if (dateTo) {
        subtitle += `Hasta: ${dateTo} `
      }

      if (project && employee && customer) {
        for (const project of customer.projects) {
          // Find all tasks by project and employee ID
          const tasks = await this.tasksService.findAllByEmployeeAndProject(
            project.id,
            employee.id,
          )
          tasks.forEach((task) => {
            const milestoneName = task.milestone ? task.milestone.name : ''
            content.push([
              DateFormatter.getDDMMYYYY(task.createdAt),
              task.description,
              task.hours,
              milestoneName,
            ])
          })
        }

        headers = ['Fecha', 'Tarea', 'Horas', 'Hito']
        if (content.length == 0) {
          content.push(['', '', '', ''])
        }
      } else if (project && employee) {
        const tasks = await this.tasksService.findAllByEmployeeAndProject(
          employeeId,
          projectId,
        )
        tasks.forEach((task) => {
          const milestoneName = task.milestone ? task.milestone.name : ''
          content.push([
            DateFormatter.getDDMMYYYY(task.createdAt),
            task.description,
            task.hours,
            milestoneName,
          ])
        })

        headers = ['Fecha', 'Tarea', 'Horas', 'Hito']
        if (content.length == 0) {
          content.push(['', '', '', ''])
        }
      } else if (project && customer) {
        // Find all tasks by project ID
        const tasks = await this.tasksService.findAllByProject(project.id)
        tasks.forEach((task) => {
          const milestoneName = task.milestone ? task.milestone.name : ''
          content.push([
            DateFormatter.getDDMMYYYY(task.createdAt),
            task.description,
            task.hours,
            milestoneName,
            task.user.firstName + ' ' + task.user.lastName,
          ])
        })

        headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Empleado']
        if (content.length == 0) {
          content.push(['', '', '', '', ''])
        }
      } else if (employee && customer) {
        for (project of customer.projects) {
          // Find all tasks by employee ID and project ID
          const tasks = await this.tasksService.findAllByEmployeeAndProject(
            employee.id,
            project.id,
          )
          tasks.forEach((task) => {
            const milestoneName = task.milestone ? task.milestone.name : ''
            content.push([
              DateFormatter.getDDMMYYYY(task.createdAt),
              task.description,
              task.hours,
              milestoneName,
              project.name,
            ])
          })
        }

        headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Proyecto']
        if (content.length == 0) {
          content.push(['', '', '', '', ''])
        }
      } else if (project) {
        project.tasks.forEach((task: Task) => {
          const milestoneName = task.milestone ? task.milestone.name : ''
          content.push([
            DateFormatter.getDDMMYYYY(task.createdAt),
            task.description,
            task.hours,
            milestoneName,
            task.user.firstName + ' ' + task.user.lastName,
          ])
        })

        headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Empleado']
        if (content.length == 0) {
          content.push(['', '', '', ''])
        }
      } else if (employee) {
        const tasks = await employee.tasks

        tasks.forEach((task: Task) => {
          const milestoneName = task.milestone ? task.milestone.name : ''
          content.push([
            DateFormatter.getDDMMYYYY(task.createdAt),
            task.description,
            task.hours,
            milestoneName,
            task.project.name,
          ])
        })

        headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Proyecto']
        if (content.length == 0) {
          content.push(['', '', '', ''])
        }
      } else if (customer) {
        for (project of customer.projects) {
          const tasks = await this.tasksService.findAllByProject(project.id)

          tasks.forEach((task: Task) => {
            const milestoneName = task.milestone ? task.milestone.name : ''
            content.push([
              DateFormatter.getDDMMYYYY(task.createdAt),
              task.description,
              task.hours,
              milestoneName,
              project.name,
              task.user.firstName + ' ' + task.user.lastName,
            ])
          })
        }

        headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Proyecto', 'Empleado']
        if (content.length == 0) {
          content.push(['', '', '', '', '', ''])
        }
      } else {
      }
    } catch (error) {
      Logger.log(error)
      throw error
    }

    const docDefinition = getHoursReport(subtitle, content, headers)
    return this.printerService.createPdf(docDefinition)
  }
}
