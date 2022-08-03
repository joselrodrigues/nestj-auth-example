import { DataSource } from 'typeorm';
// import { taskRepository } from './task.repository';

export const taskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => console.log('hola', dataSource),
  },
];
