import { Body, Controller, Get, Logger, Post, Res } from "@nestjs/common"
import { ReportsService } from "./reports.service"
import { Response } from "express"
import { GetReportBody } from "./dto/get-report"

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

    @Post('hours')
    async getHoursReport(@Res() response: Response, @Body() body: GetReportBody) {
        try {
            const pdfDocument = await this.reportsService.createHoursReport(body)

            response.setHeader('Content-type', 'application/pdf')
            pdfDocument.info.Title = 'Reporte de horas'
            pdfDocument.pipe(response)
            pdfDocument.end()
        } catch (error) {
            Logger.error(JSON.stringify(error))
            response.status(500).send({ message: error.message })
        }
    }
}