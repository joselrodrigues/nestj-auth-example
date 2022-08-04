import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/auth.model';
import { hasRoles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { EntityNotFoundError } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AuthGuard(), RolesGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @hasRoles(Role.ADMIN)
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    try {
      return await this.taskService.getTaskById(id);
    } catch (error) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    const { affected } = await this.taskService.deleteTask(id);
    if (!affected)
      throw new NotFoundException(`Task with ID "${id}" not found`);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateValues: UpdateTaskDto,
  ): Promise<Task> {
    try {
      return await this.taskService.updateTask(id, updateValues);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }
    }
  }
}
