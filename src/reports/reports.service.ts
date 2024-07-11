import { Injectable } from "@nestjs/common"
import { PrinterService } from "src/printer/printer.service"
import { getSampleReport } from "./sample-report.report"
import { getHoursReport } from "./hours.report"
import { GetReportBody } from "./dto/get-report"

const getHeaderName = (name: string) => {
    switch (name) {
        case 'project':
            return 'Proyecto:'
        case 'dateFrom':
            return 'Desde:'
        case 'dateTo':
            return 'Hasta:'
        case 'employee':
            return 'Empleado:'
        default:
            return 'Cliente:'
    }
}

@Injectable()
export class ReportsService {
    constructor(private readonly printerService: PrinterService) { }

    createReport() {
        const docDefinition = getSampleReport({ name: 'Report for Lurica Time Track App' })

        return this.printerService.createPdf(docDefinition)
    }

    async createHoursReport(requestBody: GetReportBody) {
        let subtitle = ''

        Object.entries(requestBody).forEach(entry => {
            const [key, value] = entry
            subtitle += `${getHeaderName(key)} ${value} `
        })

        const docDefinition = getHoursReport(subtitle)
        return this.printerService.createPdf(docDefinition)
    }
}