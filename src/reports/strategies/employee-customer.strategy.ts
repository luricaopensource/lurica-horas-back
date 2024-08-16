import { DateFormatter } from "src/helpers"
import { ContentStrategy } from "./content-strategy.interface"
import { TasksService } from "src/tasks/tasks.service"
import { Client } from "src/client/entities/client.entity"
import { IReportContent, IReportHeaders } from "../tasks.report"
import { User } from "src/users/entities/user.entity"

export class EmployeeCustomerStrategy implements ContentStrategy {
    constructor(private tasksService: TasksService, private customer: Client, private employee: User) { }

    async generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: IReportContent[][]; headers: IReportHeaders[] }> {
        const content = []
        let headers = []

        for (let project of this.customer.projects) {
            const tasks = await this.tasksService.findAllByEmployeeAndProject(
                this.employee.id,
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

        return { content, headers }
    }
}