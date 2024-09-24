import { TasksService } from "src/tasks/tasks.service"
import { ContentStrategy } from "./content-strategy.interface"
import { IReportContent, IReportHeaders } from "../tasks.report"
import { DateFormatter } from "src/helpers"
import { Project } from "src/projects/entities/project.entity"
import { User } from "src/users/entities/user.entity"

export class ProjectEmployeeStrategy extends ContentStrategy {
    constructor(private tasksService: TasksService, private project: Project, private employee: User) { super() }

    async generateContentAndHeaders(dateFrom: string = "", dateTo: string = ""): Promise<{ content: IReportContent[][]; totalContentRow: string[]; headers: string[] }> {
        const content = []
        let headers = []

        const dateRange = this.getDateRange(dateFrom, dateTo)

        const tasks = await this.tasksService.findAllByEmployeeAndProject(this.employee.id, this.project.id, dateRange)
        tasks.forEach((task) => {
            const milestoneName = task.milestone ? task.milestone.name : ''
            content.push([
                DateFormatter.getDDMMYYYY(task.createdAt),
                task.description,
                task.hours,
                milestoneName,
            ])
        })

        headers = ['Fecha', 'Tarea', 'Horas', 'Hito']
        if (content.length == 0) {
            content.push(['', '', '', ''])
        }
        const totalContentRow = ['Total', '', `${content.reduce((acc, curr) => acc + curr[2], 0)}`, '']

        return { content, totalContentRow, headers }
    }
}