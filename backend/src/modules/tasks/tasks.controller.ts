import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../../libs/common/decorators/current-userId.decorator';
import type { User } from '../../../generated/prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskViewQueryDto } from './dto/view.dto';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@CurrentUser() user: User) {
    return this.tasksService.getAll(user.id);
  }

  @Post()
  createTask(@CurrentUser() user: User, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(user.id, createTaskDto);
  }

  // /api/tasks/view?groupBy=status&sort=
  @Get('view')
  getTasksByStatus(
    @CurrentUser() user: User,
    @Query() query: TaskViewQueryDto,
  ) {
    return this.tasksService.getViewTasks(user.id, query.groupBy);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @CurrentUser() user: User) {
    return this.tasksService.delete(id, user.id);
  }
}
