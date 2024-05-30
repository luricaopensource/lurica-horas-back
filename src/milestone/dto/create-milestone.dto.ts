import { Project } from "src/projects/entities/project.entity"

export class CreateMilestoneDto {
    readonly id: number
    readonly date: Date
    readonly name: string
    readonly total_amount: number
    readonly paid_amount: number
    readonly surplus_amount: number
    readonly projectId: number
    readonly project: Project
}
