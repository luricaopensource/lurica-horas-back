import { HttpException, Injectable } from '@nestjs/common';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Milestone } from './entities/milestone.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class MilestoneService {

  constructor(@InjectRepository(Milestone) private readonly milestoneRepository: Repository<Milestone>) { }


  create(createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
    const milestoneData = this.milestoneRepository.create(createMilestoneDto);
    return this.milestoneRepository.save(milestoneData);
  }

  async findAll(): Promise<Milestone[]> {
    return await this.milestoneRepository.find({where: {deletedAt: IsNull()}});
  }

  async findOne(id: number): Promise<Milestone> {
    const milestone = await this.milestoneRepository.findOneBy({ id });
    if (!milestone) { throw new HttpException(`Milestone not found`, 404)};
    return milestone;
  }

  async findOneByName(name: string): Promise<Milestone> {
    const milestone = await this.milestoneRepository.findOneBy({ name });
    if (!milestone) { throw new HttpException(`Milestone not found`, 404)};
    return milestone;
  }

  async update(id: number, updateMilestoneDto: UpdateMilestoneDto): Promise<Milestone> {
    const milestone = await this.findOne(id);

    const milestoneData = this.milestoneRepository.merge(milestone, updateMilestoneDto);
    return await this.milestoneRepository.save(milestoneData);
  }

  async remove(id: number): Promise<Milestone> {
    const milestone = await this.findOne(id);
    milestone.deletedAt = new Date();

    return await this.milestoneRepository.save(milestone);
  }
}
