import { CompanyDTO } from "src/company/dto/company.dto"
import { MilestoneDTO } from "src/milestone/dto/milestone.dto"

export interface ProjectDTO {
    id: number
    name: string
    company: CompanyDTO
    currency: string,
    amount: number,
    milestones: MilestoneDTO[]
}