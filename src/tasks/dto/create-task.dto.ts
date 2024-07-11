import { Milestone } from "src/milestone/entities/milestone.entity"
import { User } from "src/users/entities/user.entity"

export class CreateTaskDto {
    readonly dateFrom: Date
    readonly dateTo: Date
    readonly hours: number
    readonly description: string
    readonly type: string
    readonly paid: boolean
    readonly status: string
    readonly userId: number
    readonly user: User
    readonly milestoneId: number
    readonly milestone: Milestone
}
