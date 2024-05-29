import { HttpException, Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './entities/task.entity'
import { IsNull, Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'
import { TaskDTO } from './dto/task.dto'
import { ProjectDTO } from 'src/projects/dto/project.dto'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly usersService: UsersService
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.usersService.findOne(createTaskDto.userId)
    const taskData = this.tasksRepository.create(createTaskDto)
    taskData.user = user

    return this.tasksRepository.save(taskData)
  }

  async findAll(): Promise<TaskDTO[]> {
    const tasks = await this.tasksRepository.find({ where: { deletedAt: IsNull() }, relations: ['user', 'project'] })

    return tasks.map<TaskDTO>((task: Task) => {
      const projectDTO: ProjectDTO = {
        id: task.project.id,
        name: task.project.name,
        currency: task.project.currency
      }

      const id = task.id
      const dateTo = task.dateTo
      const project = projectDTO
      const description = task.description
      const hours = task.hours
      const status = task.status
      const paid = task.paid

      return { id, dateTo, project, description, hours, status, paid }
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
