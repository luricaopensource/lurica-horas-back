import { IUsersToCompaniesDTO } from "src/users_to_companies/dto/users_to_companies_dto"

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
    companies: IUsersToCompaniesDTO[]
}
