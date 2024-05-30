import { ProjectDTO } from "src/projects/dto/project.dto"

export interface MilestoneDTO {
    id: number
    date: Date
    name: string
    total_amount: number
    paid_amount: number
    surplus_amount: number
    project: ProjectDTO
}