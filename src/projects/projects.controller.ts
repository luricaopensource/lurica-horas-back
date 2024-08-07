import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { CreateProjectClientDTO } from './dto/create-project.dto'
import { UpdateProjectClientDTO } from './dto/update-project.dto'

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  create(@Body() createProjectClientDTO: CreateProjectClientDTO) {
    return this.projectsService.create(createProjectClientDTO)
  }

  @Get()
  findAll() {
    return this.projectsService.findAll()
  }

  @Get('employee')
  findProjectsByEmployee() {
    return this.projectsService.findProjectsByEmployee()
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectClientDTO: UpdateProjectClientDTO) {
    return this.projectsService.update(+id, updateProjectClientDTO)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id)
  }
}
