import { IReportContent, IReportHeaders } from "../tasks.report"
import { ContentStrategy } from "./content-strategy.interface"
import { Project } from "src/projects/entities/project.entity"
import { Task } from "src/tasks/entities/task.entity"
import { DateFormatter } from "src/helpers"

export class ProjectStrategy extends ContentStrategy {
    constructor(
        private project: Project
    ) { super() }

    async generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: IReportContent[][]; totalContentRow: string[]; headers: string[] }> {
        const content = []
        let headers = []

        const dateRange = this.getDateRange(dateFrom, dateTo)

        this.project.tasks.forEach((task: Task) => {
            if (task.createdAt < dateRange.from || task.createdAt > dateRange.to) return

            const milestoneName = task.milestone ? task.milestone.name : ''
            content.push([
                DateFormatter.getDDMMYYYY(task.createdAt),
                task.description,
                task.hours,
                milestoneName,
                task.user.firstName + ' ' + task.user.lastName,
            ])
        })

        headers = ['Fecha', 'Tarea', 'Horas', 'Hito', 'Empleado']
        if (content.length == 0) {
            content.push(['', '', '', '', ''])
        }

        const totalContentRow = ['Total', '', `${content.reduce((acc, curr) => acc + curr[2], 0)}`, '', '']

        return { content, totalContentRow, headers }
    }
}