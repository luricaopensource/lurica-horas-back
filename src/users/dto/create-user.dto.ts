import { UsersToProjectsDTO, UserToProjectDTO } from "src/users_to_projects/dto/user_to_project.dto"

export class CreateUserDto {
    readonly firstName: string
    readonly lastName: string
    readonly username: string
    readonly password: string
    readonly email: string
    readonly role: number | null
    readonly currency: number | null
    readonly amount: number | null
    readonly amountType: number | null
    readonly userToProjects: UserToProjectDTO[]
}