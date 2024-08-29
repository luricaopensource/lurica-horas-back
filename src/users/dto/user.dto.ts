import { UsersToCompaniesDTO } from "src/users_to_companies/users_to_companies.dto"

export interface UserDTO {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    roleName: string
    currencyName: string
    hourlyAmount: number
    monthlyAmount: number,
    companies?: UsersToCompaniesDTO[]
}

export interface UserTaskDTO {
    id: number
    fullName: string
    hourlyAmount: number
    usdAmount: number
    currencyName: string
}