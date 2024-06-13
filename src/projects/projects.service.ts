import { HttpException, Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Project } from './entities/project.entity'
import { IsNull, Repository } from 'typeorm'
import { ProjectDTO } from './dto/project.dto'

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project)
  private readonly projectRepository: Repository<Project>) { }

  create(createProjectDto: CreateProjectDto) {
    const projectData = this.projectRepository.create(createProjectDto)

    return this.projectRepository.save(projectData)
  }

  async findAll() {
    const projects: Project[] = await this.projectRepository.find({ where: { deletedAt: IsNull() } })

    return projects.map((project: Project) => {
      const projectDTO: ProjectDTO = {
        id: project.id,
        name: project.name,
        companyName: project.company.name,
        currency: project.currency
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
