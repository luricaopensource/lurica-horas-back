import { ClientDTO } from "src/client/dto/client.dto"
import { MilestoneDTO } from "src/milestone/dto/milestone.dto"

export interface ProjectDTO {
    id: number
    name: string
    currency: string,
    amount: number,
    milestones?: MilestoneDTO[]
}

export interface ProjectClientDTO {
    id: number
    name: string
    client: ClientDTO
    currency: string,
    amount: number,
    milestones?: MilestoneDTO[]
}