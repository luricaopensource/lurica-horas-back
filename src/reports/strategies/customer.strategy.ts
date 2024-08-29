import { Client } from "src/client/entities/client.entity"
import { DateFormatter } from "src/helpers"
import { Task } from "src/tasks/entities/task.entity"
import { TasksService } from "src/tasks/tasks.service"
import { IReportContent, IReportHeaders } from "../tasks.report"
import { ContentStrategy } from "./content-strategy.interface"

export class CustomerStrategy extends ContentStrategy {
    constructor(private tasksService: TasksService, private customer: Client) { super() }

    async generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: IReportContent[][]; headers: IReportHeaders[] }> {
        const content = []
        let headers = []

        const dateRange = this.getDateRange(dateFrom, dateTo)

        for (let project of this.customer.projects) {
            const tasks = await this.tasksService.findAllByProject(project.id, dateRange)

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

        return { content, headers }
    }
}