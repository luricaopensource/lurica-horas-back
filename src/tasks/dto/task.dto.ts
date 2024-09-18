import { MilestoneDTO } from "src/milestone/dto/milestone.dto"
import { ProjectClientDTO } from "src/projects/dto/project.dto"
import { UserTaskDTO } from "src/users/dto/user.dto"

export interface TaskDTO {
    id: number
    createdAt: Date
    project: ProjectClientDTO
    description: string
    hours: number
    status: string
    paid: boolean
    milestone: MilestoneDTO
    employee: UserTaskDTO
    date: Date
}