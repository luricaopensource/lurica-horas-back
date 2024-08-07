import { HttpException, Injectable, Logger } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './entities/task.entity'
import { IsNull, Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'
import { TaskDTO } from './dto/task.dto'
import { ProjectClientDTO } from 'src/projects/dto/project.dto'
import { getCurrency } from 'src/shared/helpers/getCurrency'
import { MilestoneDTO } from 'src/milestone/dto/milestone.dto'
import { Milestone } from 'src/milestone/entities/milestone.entity'
import { MilestoneService } from 'src/milestone/milestone.service'
import { ProjectsService } from 'src/projects/projects.service'
import { UserTaskDTO } from 'src/users/dto/user.dto'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly usersService: UsersService,
    private readonly milestoneService: MilestoneService,
    private readonly projectService: ProjectsService
  ) { }

  async create(createTasksDto: CreateTaskDto[]): Promise<Task[]> {
    const tasks: Task[] = []

    for (const createTaskDto of createTasksDto) {
      Logger.log(JSON.stringify(createTaskDto), 'TasksService.create')


      const user = await this.usersService.findOne(createTaskDto.userId)
      const project = await this.projectService.findOne(createTaskDto.projectId)
      const taskData = this.tasksRepository.create(createTaskDto)

      if (createTaskDto.milestoneId) {
        const milestone = await this.milestoneService.findOne(createTaskDto.milestoneId)
        taskData.milestone = milestone
      }

      taskData.user = user
      taskData.project = project

      const savedTask = await this.tasksRepository.save(taskData)
      tasks.push(savedTask)
    }

    return tasks
  }

  async findAll(): Promise<TaskDTO[]> {
    const tasks = await this.tasksRepository.find({ where: { deletedAt: IsNull() }, relations: ['user', 'project', 'milestone'] })

    return tasks.map<TaskDTO>((task: Task) => {
      const ProjectClientDTO: ProjectClientDTO = {
        id: task.project.id,
        name: task.project.name,
        currency: getCurrency(task.project.currency),
        amount: task.project.amount,
        client: { id: task.project.client.id, name: task.project.client.name },
      }

      const id = task.id
      const dateTo = task.dateTo
      const project = ProjectClientDTO
      const description = task.description
      const hours = task.hours
      const status = task.status
      const paid = task.paid
      const milestone: MilestoneDTO = task.milestone ? { id: task.milestone.id, name: task.milestone.name } : null
      const employee: UserTaskDTO = {
        id: task.user.id,
        fullName: task.user.firstName + ' ' + task.user.lastName,
        hourlyAmount: task.user.hourlyAmount,
        currencyName: getCurrency(task.user.currency)
      }

      return { id, dateTo, project, description, hours, status, paid, milestone, employee }
    })
  }

  async findAllByEmployeeAndProject(employeeId: number, projectId: number): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { user: { id: employeeId }, project: { id: projectId } }, relations: ['milestone'] })
  }

  async findAllByProject(projectId: number): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { project: { id: projectId } } })
  }

  async findAllByEmployee(employeeId: number): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { user: { id: employeeId } }, relations: ['user', 'project', 'milestone'] })
  }

  async findAllByEmployeeDTO(employeeId: number): Promise<TaskDTO[]> {
    const tasks = await this.tasksRepository.find({ where: { user: { id: employeeId } }, relations: ['user', 'project', 'milestone'] })

    return tasks.map<TaskDTO>((task: Task) => {
      const ProjectClientDTO: ProjectClientDTO = {
        id: task.project.id,
        name: task.project.name,
        currency: getCurrency(task.project.currency),
        amount: task.project.amount,
        client: { id: task.project.client.id, name: task.project.client.name },
      }

      const id = task.id
      const dateTo = task.dateTo
      const project = ProjectClientDTO
      const description = task.description
      const hours = task.hours
      const status = task.status
      const paid = task.paid
      const milestone: MilestoneDTO = task.milestone ? { id: task.milestone.id, name: task.milestone.name } : null
      const employee: UserTaskDTO = {
        id: task.user.id,
        fullName: task.user.firstName + ' ' + task.user.lastName,
        hourlyAmount: task.user.hourlyAmount,
        currencyName: getCurrency(task.user.currency)
      }

      return { id, dateTo, project, description, hours, status, paid, milestone, employee }
    })
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id })
    if (!task) { throw new HttpException(`Task with id ${id} not found`, 404) }
    return task
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id)
    if (!task) { throw new HttpException(`Task with id ${id} not found`, 404) }

    const taskData = this.tasksRepository.merge(task, updateTaskDto)
    return await this.tasksRepository.save(taskData)
  }

  async remove(id: number): Promise<Task> {
    const task = await this.findOne(id)
    if (!task) { throw new HttpException(`Task with id ${id} not found`, 404) }

    task.deletedAt = new Date()
    return await this.tasksRepository.save(task)
  }
}
