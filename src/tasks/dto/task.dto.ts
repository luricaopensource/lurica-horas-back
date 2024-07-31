import { MilestoneDTO } from "src/milestone/dto/milestone.dto"
import { Milestone } from "src/milestone/entities/milestone.entity"
import { ProjectDTO } from "src/projects/dto/project.dto"

export interface TaskDTO {
    id: number
    dateTo: Date
    project: ProjectDTO
    description: string
    hours: number
    status: string
    paid: boolean
    milestone: MilestoneDTO
}