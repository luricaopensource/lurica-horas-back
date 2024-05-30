import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { Milestone } from './entities/milestone.entity';

@Controller('milestone')
export class MilestoneController {
  constructor(private readonly milestoneService: MilestoneService) {}

  @Post()
  create(@Body() createMilestoneDto: CreateMilestoneDto) {
    return this.milestoneService.create(createMilestoneDto);
  }

  @Get()
  findAll() {
    return this.milestoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Milestone> {
    return this.milestoneService.findOne(+id);
  }

  @Get(':name')
  findOneByName(@Param('name') name: string): Promise<Milestone> {
    return this.milestoneService.findOneByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMilestoneDto: UpdateMilestoneDto): Promise<Milestone> {
    return this.milestoneService.update(+id, updateMilestoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Milestone> {
    return this.milestoneService.remove(+id);
  }
}
