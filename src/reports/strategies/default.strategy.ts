import { DateFormatter } from "src/helpers"
import { ContentStrategy } from "./content-strategy.interface"
import { TasksService } from "src/tasks/tasks.service"

export class DefaultGenerationStrategy extends ContentStrategy {
    constructor(private tasksService: TasksService) { super() }

    async generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: any[]; headers: any[] }> {
        const content = []
        let headers = []

        const dateRange = this.getDateRange(dateFrom, dateTo)

        // Get all tasks
        const tasks = await this.tasksService.findAll()

        for (let task of tasks) {
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


        return { content: [], headers: [] }
    }
}