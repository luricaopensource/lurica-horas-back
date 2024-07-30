import { Injectable, Logger } from "@nestjs/common"
import { PrinterService } from "src/printer/printer.service"
import { getSampleReport } from "./sample-report.report"
import { getHoursReport } from "./hours.report"
import { GetReportBody } from "./dto/get-report"
import { ProjectsService } from '../projects/projects.service'
import { UsersService } from "src/users/users.service"
import { ClientService } from "src/client/client.service"
import { Project } from "src/projects/entities/project.entity"
import { User } from "src/users/entities/user.entity"
import { Client } from "src/client/entities/client.entity"
import { TasksService } from "src/tasks/tasks.service"
import { Task } from "src/tasks/entities/task.entity"
import { DateFormatter } from "src/helpers"

@Injectable()
export class ReportsService {
    constructor(
        private readonly printerService: PrinterService,
        private readonly projectService: ProjectsService,
        private readonly employeeService: UsersService,
        private readonly clientService: ClientService,
        private readonly tasksService: TasksService
    ) { }

    createReport() {
        const docDefinition = getSampleReport({ name: 'Report for Lurica Time Track App' })

        return this.printerService.createPdf(docDefinition)
    }

    async createHoursReport(requestBody: GetReportBody): Promise<PDFKit.PDFDocument> {
        const { dateFrom, dateTo, projectId, employeeId, customerId } = requestBody
        let subtitle = ''
        let content = []
        let headers = []

        try {
            let project: Project | null = null
            let employee: User | null = null
            let customer: Client | null = null

            if (projectId) { project = await this.projectService.findOne(projectId) }
            if (employeeId) { employee = await this.employeeService.findOne(employeeId) }
            if (customerId) { customer = await this.clientService.findOneWithProjects(customerId) }

            if (project) { subtitle += `Proyecto: ${project.name} ` }
            if (employee) { subtitle += `Empleado: ${employee.firstName} ` }
            if (customer) { subtitle += `Cliente: ${customer.name} ` }
            if (dateFrom) { subtitle += `Desde: ${dateFrom} ` }
            if (dateTo) { subtitle += `Hasta: ${dateTo} ` }

            if (project && employee && customer) {
                for (const project of customer.projects) {
                    // Find all hours by project and employee ID
                    const hours = await this.tasksService.findAllByEmployeeAndProject(project.id, employee.id)
                    hours.forEach((hour) => {
                        content.push([
                            DateFormatter.getDDMMYYYY(hour.createdAt),
                            hour.description,
                            hour.hours,
                            hour.milestone.name
                        ])
                    })
                }

                headers = ['Fecha', 'Tarea', 'Horas', 'Hito']
                if (content.length == 0) { content = ['', '', '', ''] }
            }
            else if (project && employee) {
                const hours = await this.tasksService.findAllByEmployeeAndProject(employeeId, projectId)
                hours.forEach((hour) => {
                    content.push([
                        hour.createdAt,
                        hour.description,
                        hour.hours,
                        hour.milestone.name
                    ])
                })

                headers = ['Fecha', 'Tarea', 'Horas', 'Hito']
                if (content.length == 0) { content = ['', '', '', ''] }
            }
            else if (project && customer) {
                customer.projects.forEach(async (project: Project) => {
                    // Find all hours by project ID
                    const hours = await this.tasksService.findAllByProject(project.id)
                    hours.forEach((hour: Task) => {
                        content.push([
                            hour.createdAt,
                            hour.description,
                            hour.hours,
                            hour.milestone.name,
                            hour.user.firstName + ' ' + hour.user.lastName
                        ])
                    })
                })

                headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Empleado']
                if (content.length == 0) { content = ['', '', '', '', ''] }
            }
            else if (employee && customer) {
                customer.projects.forEach(async (project: Project) => {
                    // Find all hours by employee ID
                    const hours = await this.tasksService.findAllByEmployee(employee.id)
                    hours.forEach((hour) => {
                        content.push([
                            hour.createdAt,
                            hour.description,
                            hour.hours,
                            hour.milestone.name,
                            project.name
                        ])
                    })
                })

                headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Proyecto']
                if (content.length == 0) { content = ['', '', '', '', ''] }
            }
            else if (project) {
                headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Empleado']
                if (content.length == 0) { content = ['', '', '', '', ''] }
            }
            else if (employee) {
                headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Proyecto']
                if (content.length == 0) { content = ['', '', '', '', ''] }
            }
            else if (customer) {
                headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Proyecto', 'Empleado']
                if (content.length == 0) { content = ['', '', '', '', '', ''] }
            }
            else { }
        } catch (error) {
            throw error
        }

        const docDefinition = getHoursReport(subtitle, content, headers)
        return this.printerService.createPdf(docDefinition)
    }
}