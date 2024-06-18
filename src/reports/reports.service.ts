import { Injectable } from "@nestjs/common"
import { PrinterService } from "src/printer/printer.service"
import { getSampleReport } from "./sample-report.report"


@Injectable()
export class ReportsService {
    constructor(private readonly printerService: PrinterService) { }

    createReport() {
        const docDefinition = getSampleReport({ name: 'Report for Lurica Time Track App' })

        return this.printerService.createPdf(docDefinition)
    }
}