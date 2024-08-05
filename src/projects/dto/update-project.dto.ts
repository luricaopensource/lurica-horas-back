import { PartialType } from '@nestjs/mapped-types'
import { CreateProjectClientDTO } from './create-project.dto'

export class UpdateProjectClientDTO extends PartialType(CreateProjectClientDTO) { }
