import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { IsNull, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDTO } from './dto/user.dto'
import { REQUEST } from '@nestjs/core'
import { getCurrency } from 'src/shared/helpers/getCurrency'
import { getRole } from 'src/shared/helpers/getRole'
import { IResponse } from 'src/shared/interfaces/response'
import { UsersToProjects } from 'src/users_to_projects/users_to_projects.entity'
import { getAmountType } from 'src/shared/helpers/getAmountType'
import { DateFormatter } from 'src/helpers'
import { Project } from 'src/projects/entities/project.entity'

export interface UserResponse {
  id: number
}

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UsersToProjects)
    private readonly usersToProjectsRepository: Repository<UsersToProjects>,
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<IResponse> {
    const userData = this.userRepository.create(createUserDto)

    const savedUser = await this.userRepository.save(userData)

    return { id: savedUser.id }
  }

  async findAll(): Promise<UserDTO[]> {
    const users: User[] = await this.userRepository.find({
      where: { deletedAt: IsNull() },
    })

    const usersDto = []

    for (let user of users) {
      const usersToCompanies = await user.usersToCompanies
      const usersToProjects = await user.usersToProjects

      const userDTO: UserDTO = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        roleName: getRole(user.role),
        currencyName: getCurrency(user.currency),
        amount: user.amount,
        amountType: user.amountType,
        amountTypeName: getAmountType(user.amountType),
        companies: usersToCompanies.map((userToCompany) => {
          return {
            id: userToCompany.company.id,
            name: userToCompany.company.name,
          }
        }),
        projects: usersToProjects.map((userToProject) => {
          return {
            id: userToProject.project.id,
            name: userToProject.project.name,
          }
        })
      }

      usersDto.push(userDTO)
    }

    return usersDto
  }

  async findAllEmployees(): Promise<UserDTO[]> {
    const users: User[] = await this.userRepository.find({
      where: { role: 3, deletedAt: IsNull() },
    })

    const usersDto = []

    for (let user of users) {
      const usersToCompanies = await user.usersToCompanies
      const usersToProjects = await user.usersToProjects

      const userDTO: UserDTO = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        roleName: getRole(user.role),
        currencyName: getCurrency(user.currency),
        amount: user.amount,
        amountType: user.amountType,
        amountTypeName: getAmountType(user.amountType),
        companies: usersToCompanies.map((userToCompany) => {
          return {
            id: userToCompany.company.id,
            name: userToCompany.company.name,
          }
        }),
        projects: usersToProjects.map((userToProject) => {
          return {
            id: userToProject.project.id,
            name: userToProject.project.name,
          }
        })
      }

      usersDto.push(userDTO)
    }

    return usersDto
  }

  async findOne(id: number, relations: string[] = []): Promise<User> {
    const options = relations.length
      ? { where: { id }, relations }
      : { where: { id } }

    const user = await this.userRepository.findOne(options)
    if (!user) {
      throw new HttpException(`Usuario no encontrado`, 404)
    }
    return user
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } })
    if (!user) {
      throw new HttpException(`Usuario ${username} no encontrado`, 404)
    }
    return user
  }

  async saveLastLogin(id: number): Promise<void> {
    await this.userRepository.update(id, {
      lastLogin: new Date()
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<IResponse> {
    const user = await this.findOne(id)
    const savedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    })

    for (let userToProject of updateUserDto.userToProjects) {
      if ((await this.usersToProjectsRepository.find({
        where: {
          user: { id },
          project: { id: userToProject.project }
        }
      })).length > 0) continue

      const userProjectToSave = new UsersToProjects()
      userProjectToSave.user = savedUser
      userProjectToSave.project = await this.projectsRepository.findOneBy({ id: userToProject.project })

      const newUserToProject = this.usersToProjectsRepository.create(userProjectToSave)

      this.usersToProjectsRepository.save(newUserToProject)
    }

    return { id: savedUser.id }
  }

  async remove(id: number): Promise<IResponse> {
    const user = await this.findOne(id)
    const deletedUser = await this.userRepository.save({
      ...user,
      deletedAt: new Date(),
    })

    return { id: deletedUser.id }
  }

  async removeUserToProject(userId: number, projectId: number): Promise<IResponse> {
    const userToProject = await this.usersToProjectsRepository.findOne({
      where: {
        user: { id: userId },
        project: { id: projectId }
      }
    })

    if (!userToProject) {
      throw new HttpException(`Usuario no asignado al proyecto`, 404)
    }

    await this.usersToProjectsRepository.remove(userToProject)

    return { id: userId }
  }

  async getUserFromBearerToken(): Promise<UserDTO> {
    const userId = this.request['user'].sub

    const user = await this.findOne(userId, ['usersToCompanies'])

    const userToCompanies = await user.usersToCompanies
    const userToProjects = await user.usersToProjects

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      roleName: getRole(user.role),
      currencyName: getCurrency(user.currency),
      amount: user.amount,
      amountType: user.amountType,
      amountTypeName: getAmountType(user.amountType),
      lastLogin: DateFormatter.getDDMMYYYYHHMM(user.lastLogin),
      companies: userToCompanies.map((usersToCompanies) => {
        return {
          id: usersToCompanies.company.id,
          name: usersToCompanies.company.name,
        }
      }),
      projects: userToProjects.map((usersToProjects) => {
        return {
          id: usersToProjects.project.id,
          name: usersToProjects.project.name,
        }
      })
    }
  }
}
