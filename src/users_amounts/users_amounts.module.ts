import { Module } from '@nestjs/common';
import { UsersAmountsService } from './users_amounts.service';
import { UsersAmountsController } from './users_amounts.controller';

@Module({
  controllers: [UsersAmountsController],
  providers: [UsersAmountsService],
})
export class UsersAmountsModule {}
