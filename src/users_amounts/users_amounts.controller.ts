import { Controller } from '@nestjs/common';
import { UsersAmountsService } from './users_amounts.service';

@Controller('users-amounts')
export class UsersAmountsController {
  constructor(private readonly usersAmountsService: UsersAmountsService) {}
}
