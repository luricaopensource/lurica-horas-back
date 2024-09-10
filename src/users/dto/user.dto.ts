import { UsersToCompaniesDTO } from "src/users_to_companies/users_to_companies.dto"
import { UsersToProjectsDTO } from "src/users_to_projects/dto/user_to_project.dto"

export interface UserDTO {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    roleName: string
    currencyName: string
    amount: number
    amountType: number
    amountTypeName: string
    companies?: UsersToCompaniesDTO[]
    projects?: UsersToProjectsDTO[]
    lastLogin?: string
}

export interface UserTaskDTO {
    id: number
    fullName: string
    hourlyAmount: number
    blueQuoteAmount: number
    officialQuoteAmount: number
    currencyName: string
}
