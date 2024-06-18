import { Controller, Get, Res } from "@nestjs/common"
import { ReportsService } from "./reports.service"
import { Response } from "express"

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get()
    getReport(@Res() response: Response) {
        const pdfDocument = this.reportsService.createReport()

        response.setHeader('Content-type', 'application/pdf')
        pdfDocument.info.Title = 'Sample Report'
        pdfDocument.pipe(response)
        pdfDocument.end()
    }
}