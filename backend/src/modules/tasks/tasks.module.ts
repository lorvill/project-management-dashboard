import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [UserModule],
})
export class TasksModule {}
