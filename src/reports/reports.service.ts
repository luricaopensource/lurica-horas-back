import { Injectable } from "@nestjs/common"
import { PrinterService } from "src/printer/printer.service"
import { getSampleReport } from "./sample-report.report"
import { getHoursReport } from "./hours.report"
import { GetReportBody } from "./dto/get-report"
import { ProjectsService } from '../projects/projects.service'
import { UsersService } from "src/users/users.service"
import { ClientService } from "src/client/client.service"

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
        let subtitle = ''

        Object.entries(requestBody).forEach(entry => {
            const [key, value] = entry
            subtitle += `${getHeaderName(key)} ${value} `
        })

        const { dateFrom, dateTo, projectId, employeeId, customerId } = requestBody

        try {
            const project = await this.projectService.findOne(projectId)
            const employee = await this.employeeService.findOne(employeeId)
            const client = await this.clientService.findOne(customerId)
        } catch (error) {
            throw error
        }

        const content = []

        const docDefinition = getHoursReport(subtitle, content)
        return this.printerService.createPdf(docDefinition)
    }
}