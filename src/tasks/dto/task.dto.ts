import { MilestoneDTO } from "src/milestone/dto/milestone.dto"
import { Milestone } from "src/milestone/entities/milestone.entity"
import { ProjectClientDTO } from "src/projects/dto/project.dto"

export interface TaskDTO {
    id: number
    dateTo: Date
    project: ProjectClientDTO
    description: string
    hours: number
    status: string
    paid: boolean
    milestone: MilestoneDTO
}