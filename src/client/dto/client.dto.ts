import { ProjectClientDTO, ProjectDTO } from "src/projects/dto/project.dto"

export interface ClientDTO {
    id: number
    name: string
}

export interface AllClientsDTO {
    id: number
    name: string,
    projects: ProjectDTO[]
}