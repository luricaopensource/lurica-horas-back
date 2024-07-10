import { HttpException, Injectable, Logger } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Project } from './entities/project.entity'
import { IsNull, Repository } from 'typeorm'
import { ProjectDTO } from './dto/project.dto'
import { CompanyService } from 'src/company/company.service'
import { IResponse } from 'src/shared/interfaces/response'
import { getCurrency } from 'src/shared/helpers/getCurrency'
import { Milestone } from 'src/milestone/entities/milestone.entity'
import { MilestoneDTO } from 'src/milestone/dto/milestone.dto'

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project)
  private readonly projectRepository: Repository<Project>,
    private readonly companyService: CompanyService) { }

  async create(createProjectDto: CreateProjectDto): Promise<IResponse> {
    const company = await this.companyService.findOne(createProjectDto.companyId)
    const projectData = this.projectRepository.create(createProjectDto)

    projectData.currency = projectData.currency
    projectData.amount = projectData.amount
    projectData.company = company

    const savedProject = await this.projectRepository.save(projectData)

    return { id: savedProject.id }
  }

  async findAll() {
    const projects: Project[] = await this.projectRepository.find({ where: { deletedAt: IsNull() }, relations: ['company'] })

    return projects.map((project: Project) => {
      const projectDTO: ProjectDTO = {
        id: project.id,
        name: project.name,
        company: { id: project.company.id, name: project.company.name },
        currency: getCurrency(project.currency),
        amount: project.amount,
        milestones: project.milestones.map<MilestoneDTO>((milestone: Milestone) => { return { id: milestone.id, name: milestone.name } })
      }

      return projectDTO
    })
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOneBy({ id })
    if (!project) { throw new HttpException(`Proyecto no encontrado`, 404) }
    return project
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id)
    return await this.projectRepository.save({ ...project, ...updateProjectDto })
  }

  async remove(id: number) {
    const project = await this.findOne(id)
    return await this.projectRepository.save({ ...project, deletedAt: new Date() })
  }
}
