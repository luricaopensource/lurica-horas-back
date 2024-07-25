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

const getHeaderName = (name: string) => {
    switch (name) {
        case 'projectId':
            return 'Proyecto:'
        case 'dateFrom':
            return 'Desde:'
        case 'dateTo':
            return 'Hasta:'
        case 'employeeId':
            return 'Empleado:'
        default:
            return 'Cliente:'
    }
}

@Injectable()
export class ReportsService {
    constructor(
        private readonly printerService: PrinterService,
        private readonly projectService: ProjectsService,
        private readonly employeeService: UsersService,
        private readonly clientService: ClientService
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
                customer.projects.forEach((project: Project) => {
                    Logger.log(JSON.stringify(project))
                })

                return

                content = []
                headers = []
            }
            else if (project && employee) { }
            else if (project && customer) { }
            else if (employee && customer) { }
            else if (project) { }
            else if (employee) { }
            else if (customer) { }
            else { }


            // 1. If there's only project ID in the request, get all the hours for that project, add a column of employee name and show the project name in the subtitle
            // 2. If there's only employee ID in the request, get all the hours for that employee and add a column of project name
            // 3. If there's only customer ID in the request, get all the hours for that customer and add a column of project name and employee name
            // 4. If there's project ID and employee ID in the request, get all the hours for that project and employee and show the employee name as a subtitle
            // 5. If there's project ID and customer ID in the request
            // 5. get all the hours for that project and customer and show the customer name as a subtitle also show the employee name in a column
            // 6. If there's employee ID and customer ID in the request, get all the hours for that employee and customer and show the customer name and the employee name as a subtitle also show the project name in a column
        } catch (error) {
            throw error
        }

        const docDefinition = getHoursReport(subtitle, content, headers)
        return this.printerService.createPdf(docDefinition)
    }
}