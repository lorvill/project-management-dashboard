import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UserService } from '../user/user.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, UserService],
})
export class TasksModule {}
