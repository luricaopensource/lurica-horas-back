import { HttpException, Injectable, Logger } from '@nestjs/common'
import { CreateProjectClientDTO } from './dto/create-project.dto'
import { UpdateProjectClientDTO } from './dto/update-project.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Project } from './entities/project.entity'
import { IsNull, Repository } from 'typeorm'
import { ProjectClientDTO } from './dto/project.dto'
import { ClientService } from 'src/client/client.service'
import { IResponse } from 'src/shared/interfaces/response'
import { getCurrency } from 'src/shared/helpers/getCurrency'
import { Milestone } from 'src/milestone/entities/milestone.entity'
import { MilestoneDTO } from 'src/milestone/dto/milestone.dto'
import { UsersToProjects } from 'src/users_to_projects/users_to_projects.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(UsersToProjects)
    private readonly usersToProjectsRepository: Repository<UsersToProjects>,
    private readonly clientService: ClientService,
    private readonly userService: UsersService
  ) { }

  async create(createProjectClientDTO: CreateProjectClientDTO): Promise<IResponse> {
    const client = await this.clientService.findOne(createProjectClientDTO.clientId)
    const projectData = this.projectRepository.create(createProjectClientDTO)

    projectData.currency = projectData.currency
    projectData.amount = projectData.amount
    projectData.client = client

    const savedProject = await this.projectRepository.save(projectData)

    return { id: savedProject.id }
  }

  async findAll(): Promise<ProjectClientDTO[]> {
    const projects: Project[] = await this.projectRepository.find({ where: { deletedAt: IsNull() }, relations: ['client'] })

    return projects.map((project: Project) => {
      const ProjectClientDTO: ProjectClientDTO = {
        id: project.id,
        name: project.name,
        client: { id: project.client.id, name: project.client.name },
        currency: getCurrency(project.currency),
        amount: project.amount,
        milestones: project.milestones.map<MilestoneDTO>((milestone: Milestone) => { return { id: milestone.id, name: milestone.name } })
      }

      return ProjectClientDTO
    })
  }

  async findProjectsByEmployee(id: number): Promise<ProjectClientDTO[]> {
    const user = await this.userService.findOne(id)

    const usersToProjects: UsersToProjects[] = await this.usersToProjectsRepository.find({ where: { deletedAt: IsNull(), user: { id: user.id } }, relations: ['project'] })

    const projects: ProjectClientDTO[] = []

    for (let userToProject of usersToProjects) {
      const ProjectClientDTO: ProjectClientDTO = {
        id: userToProject.project.id,
        name: userToProject.project.name,
        client: { id: userToProject.project.client.id, name: userToProject.project.client.name },
        currency: getCurrency(userToProject.project.currency),
        amount: userToProject.project.amount,
        milestones: userToProject.project.milestones.map<MilestoneDTO>((milestone: Milestone) => { return { id: milestone.id, name: milestone.name } })
      }

      projects.push(ProjectClientDTO)
    }

    return projects
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOneBy({ id })
    if (!project) { throw new HttpException(`Proyecto no encontrado`, 404) }
    return project
  }

  async update(id: number, updateProjectClientDTO: UpdateProjectClientDTO) {
    const project = await this.findOne(id)
    return await this.projectRepository.save({ ...project, ...updateProjectClientDTO })
  }

  async remove(id: number) {
    const project = await this.findOne(id)
    return await this.projectRepository.save({ ...project, deletedAt: new Date() })
  }
}
