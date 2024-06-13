import { HttpException, Injectable } from '@nestjs/common'
import { CreateMilestoneDto } from './dto/create-milestone.dto'
import { UpdateMilestoneDto } from './dto/update-milestone.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Milestone } from './entities/milestone.entity'
import { IsNull, Repository } from 'typeorm'
import { ProjectsService } from 'src/projects/projects.service'
import { MilestoneDTO } from './dto/milestone.dto'
import { ProjectDTO } from 'src/projects/dto/project.dto'

@Injectable()
export class MilestoneService {

  constructor(
    @InjectRepository(Milestone)
    private readonly milestoneRepository: Repository<Milestone>,
    private readonly projectService: ProjectsService
  ) { }


  async create(createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
    const project = await this.projectService.findOne(createMilestoneDto.projectId)
    const milestoneData = this.milestoneRepository.create(createMilestoneDto)
    // milestoneData.project = project; descomentar cuando juli termine project

    return this.milestoneRepository.save(milestoneData)
  }


  async findAll(): Promise<MilestoneDTO[]> {
    const milestones = await this.milestoneRepository.find({ where: { deletedAt: IsNull() }, relations: ['project'] })

    return milestones.map<MilestoneDTO>((milestone: Milestone) => {
      const projectDTO: ProjectDTO = {
        id: milestone.project.id,
        name: milestone.project.name,
        currency: milestone.project.currency,
        companyName: milestone.project.company.name
      }

      const id = milestone.id
      const date = milestone.date
      const name = milestone.name
      const total_amount = milestone.total_amount
      const paid_amount = milestone.paid_amount
      const surplus_amount = milestone.surplus_amount
      const project = projectDTO

      return { id, date, name, total_amount, paid_amount, surplus_amount, project }
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
