import { TasksService } from "src/tasks/tasks.service"
import { ContentStrategy } from "./content-strategy.interface"
import { IReportContent, IReportHeaders } from "../tasks.report"
import { DateFormatter } from "src/helpers"
import { Project } from "src/projects/entities/project.entity"

export class ProjectCustomerStrategy implements ContentStrategy {
    constructor(private tasksService: TasksService, private project: Project) { }

    async generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: IReportContent[][]; headers: IReportHeaders[] }> {
        const content = []
        let headers = []

        const tasks = await this.tasksService.findAllByProject(this.project.id)
        tasks.forEach((task) => {
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

        return { content, headers }
    }
}