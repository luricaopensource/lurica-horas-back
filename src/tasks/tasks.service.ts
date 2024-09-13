import { HttpException, Injectable, Logger } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './entities/task.entity'
import { Between, IsNull, Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'
import { TaskDTO } from './dto/task.dto'
import { ProjectClientDTO } from 'src/projects/dto/project.dto'
import { getCurrency } from 'src/shared/helpers/getCurrency'
import { MilestoneDTO } from 'src/milestone/dto/milestone.dto'
import { MilestoneService } from 'src/milestone/milestone.service'
import { ProjectsService } from 'src/projects/projects.service'
import { UserTaskDTO } from 'src/users/dto/user.dto'
import { DollarQuoteService } from 'src/dollar-quote/dollar-quote.service'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly usersService: UsersService,
    private readonly milestoneService: MilestoneService,
    private readonly projectService: ProjectsService,
    private readonly dollarQuoteService: DollarQuoteService
  ) { }

  async create(createTasksDto: CreateTaskDto[]): Promise<Task[]> {
    const tasks: Task[] = []

    for (const createTaskDto of createTasksDto) {
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

  async iterateTasks(tasks: Task[]): Promise<TaskDTO[]> {
    const tasksDto = []

    for (let task of tasks) {
      const ProjectClientDTO: ProjectClientDTO = {
        id: task.project.id,
        name: task.project.name,
        currency: getCurrency(task.project.currency),
        amount: task.project.amount,
        client: { id: task.project.client.id, name: task.project.client.name },
      }

      const dollarQuotes = await this.dollarQuoteService.findQuote()

      const blueQuoteAmount = +((task.user.amount * dollarQuotes.blue).toFixed(2))
      const officialQuoteAmount = +((task.user.amount * dollarQuotes.official).toFixed(2))

      const id = task.id
      const project = ProjectClientDTO
      const description = task.description
      const hours = task.hours
      const paid = task.paid
      const status = task.status
      const createdAt = task.createdAt
      const milestone: MilestoneDTO = task.milestone ? { id: task.milestone.id, name: task.milestone.name } : null
      const employee: UserTaskDTO = {
        id: task.user.id,
        fullName: task.user.firstName + ' ' + task.user.lastName,
        hourlyAmount: task.user.amount,
        amountType: task.user.amountType === 1 ? 'Mensual' : 'Horario',
        blueQuoteAmount,
        officialQuoteAmount,
        currencyName: getCurrency(task.user.currency)
      }

      tasksDto.push({ id, createdAt, project, description, hours, status, paid, milestone, employee })
    }

    return tasksDto
  }

  async findAll(): Promise<TaskDTO[]> {
    const tasks = await this.tasksRepository.find({ where: { deletedAt: IsNull() }, relations: ['user', 'project', 'milestone'] })

    return this.iterateTasks(tasks)
  }

  async findAllByEmployeeAndProject(employeeId: number, projectId: number, dateRange: { from: Date, to: Date } = { from: null, to: null }): Promise<Task[]> {
    const where = { user: { id: employeeId }, project: { id: projectId } }

    if (dateRange.from && dateRange.to) {
      where['createdAt'] = Between(dateRange.from, dateRange.to)
    }

    return await this.tasksRepository.find({ where, relations: ['milestone'] })
  }

  async findAllByProject(projectId: number, dateRange: { from: Date, to: Date } = { from: null, to: null }): Promise<Task[]> {
    const where = { project: { id: projectId } }

    if (dateRange.from && dateRange.to) {
      where['createdAt'] = Between(dateRange.from, dateRange.to)
    }

    return await this.tasksRepository.find({ where })
  }

  async findAllByEmployee(employeeId: number): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { user: { id: employeeId } }, relations: ['user', 'project', 'milestone'] })
  }

  async findAllByEmployeeDTO(employeeId: number): Promise<TaskDTO[]> {
    const tasks = await this.tasksRepository.find({ where: { user: { id: employeeId } }, relations: ['user', 'project', 'milestone'] })

    return this.iterateTasks(tasks)
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
