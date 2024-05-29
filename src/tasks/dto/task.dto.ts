import { ProjectDTO } from "src/projects/dto/project.dto"

export interface TaskDTO {
    id: number
    dateTo: Date
    project: ProjectDTO
    description: string
    hours: number
    status: string
    paid: boolean
}