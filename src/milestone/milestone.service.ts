import { HttpException, Injectable } from '@nestjs/common'
import { CreateMilestoneDto } from './dto/create-milestone.dto'
import { UpdateMilestoneDto } from './dto/update-milestone.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Milestone } from './entities/milestone.entity'
import { IsNull, Repository } from 'typeorm'
import { ProjectsService } from 'src/projects/projects.service'
import { MilestoneDTO } from './dto/milestone.dto'
import { IResponse } from 'src/shared/interfaces/response'

@Injectable()
export class MilestoneService {

  constructor(
    @InjectRepository(Milestone)
    private readonly milestoneRepository: Repository<Milestone>,
    private readonly projectService: ProjectsService
  ) { }


  async create(createMilestoneDto: CreateMilestoneDto): Promise<IResponse> {
    const project = await this.projectService.findOne(createMilestoneDto.projectId)
    const milestoneData = this.milestoneRepository.create(createMilestoneDto)

    milestoneData.project = project

    const savedMilestone = await this.milestoneRepository.save(milestoneData)

    return { id: savedMilestone.id }
  }


  async findAll(): Promise<MilestoneDTO[]> {
    const milestones = await this.milestoneRepository.find({ where: { deletedAt: IsNull() }, relations: ['project', 'project.client'] })

    return milestones.map<MilestoneDTO>((milestone: Milestone) => {
      const id = milestone.id
      const date = milestone.date
      const name = milestone.name
      const amount = milestone.amountPercentage
      const projectName = milestone.project.name

      return { id, date, name, amount, projectName }
    })
  }

  async findAllByProject(projectId: number): Promise<MilestoneDTO[]> {
    const milestones = await this.milestoneRepository.find({ where: { project: {id: projectId }, deletedAt: IsNull() }, relations: ['project', 'project.client'] })

    return milestones.map<MilestoneDTO>((milestone: Milestone) => {
      const id = milestone.id
      const date = milestone.date
      const name = milestone.name
      const amount = milestone.amountPercentage
      const projectName = milestone.project.name

      return { id, date, name, amount, projectName }
    })
  }

  async findOne(id: number): Promise<Milestone> {
    const milestone = await this.milestoneRepository.findOneBy({ id })
    if (!milestone) { throw new HttpException(`Milestone with id ${id} not found`, 404) };
    return milestone
  }

  async findOneByName(name: string): Promise<Milestone> {
    const milestone = await this.milestoneRepository.findOneBy({ name })
    if (!milestone) { throw new HttpException(`Milestone with id ${name} not found`, 404) };
    return milestone
  }

  async update(id: number, updateMilestoneDto: UpdateMilestoneDto): Promise<Milestone> {
    const milestone = await this.findOne(id)
    if (!milestone) { throw new HttpException(`Milestone with id ${id} not found`, 404) };

    const milestoneData = this.milestoneRepository.merge(milestone, updateMilestoneDto)
    return await this.milestoneRepository.save(milestoneData)
  }

  async remove(id: number): Promise<Milestone> {
    const milestone = await this.findOne(id)
    if (!milestone) { throw new HttpException(`Milestone with id ${id} not found`, 404) };

    milestone.deletedAt = new Date()
    return await this.milestoneRepository.save(milestone)
  }
}
