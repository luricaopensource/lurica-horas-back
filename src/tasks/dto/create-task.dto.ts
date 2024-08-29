import { Milestone } from "src/milestone/entities/milestone.entity"
import { Project } from "src/projects/entities/project.entity"
import { User } from "src/users/entities/user.entity"

export class CreateTaskDto {
    readonly createdAt: Date
    readonly hours: number
    readonly description: string
    readonly type: string
    readonly paid: boolean
    readonly status: string
    readonly userId: number
    readonly user: User
    readonly milestoneId: number
    readonly milestone: Milestone
    readonly projectId: number
    readonly project: Project
}
