import { DateFormatter } from "src/helpers"
import { ContentStrategy } from "./content-strategy.interface"
import { TasksService } from "src/tasks/tasks.service"
import { IReportContent, IReportHeaders } from "../tasks.report"
import { Logger } from "@nestjs/common"

export class DefaultGenerationStrategy extends ContentStrategy {
    constructor(private tasksService: TasksService) { super() }

    async generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: IReportContent[][]; headers: string[] }> {
        const content = []
        let headers = []

        const dateRange = this.getDateRange(dateFrom, dateTo)

        const tasks = await this.tasksService.findAll()

        for (let task of tasks) {
            if (task.createdAt < dateRange.from || task.createdAt > dateRange.to) continue

            const milestoneName = task.milestone ? task.milestone.name : ''
            content.push([
                DateFormatter.getDDMMYYYY(task.createdAt),
                task.description,
                task.hours,
                milestoneName,
                task.project.name,
                task.project.client.name,
                task.employee.fullName,
            ])
        }

        headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Proyecto', 'Cliente', 'Empleado']
        if (content.length == 0) {
            content.push(['', '', '', '', '', '', ''])
        }

        return { content, headers }
    }
}