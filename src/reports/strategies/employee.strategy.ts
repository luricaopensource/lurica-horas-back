import { User } from "src/users/entities/user.entity"
import { IReportContent, IReportHeaders } from "../tasks.report"
import { ContentStrategy } from "./content-strategy.interface"
import { Task } from "src/tasks/entities/task.entity"
import { DateFormatter } from "src/helpers"

export class EmployeeStrategy implements ContentStrategy {
    constructor(private employee: User) { }

    async generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: IReportContent[][]; headers: IReportHeaders[] }> {
        const content = []
        let headers = []

        const tasks = await this.employee.tasks

        tasks.forEach((task: Task) => {
            const milestoneName = task.milestone ? task.milestone.name : ''
            content.push([
                DateFormatter.getDDMMYYYY(task.createdAt),
                task.description,
                task.hours,
                milestoneName,
                task.project.name,
            ])
        })

        headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Proyecto']
        if (content.length == 0) {
            content.push(['', '', '', '', ''])
        }

        return { content, headers }
    }
}