import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TaskController],
  providers: [TaskService, TasksRepository, PassportModule],
})
export class TaskModule {}
