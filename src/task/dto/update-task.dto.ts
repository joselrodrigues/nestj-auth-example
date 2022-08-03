import { IsEnum, IsOptional, IsString, ValidateIf } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  @ValidateIf((o) => {
    let validate = true;
    if (o.description) validate = false;
    if (o.status) validate = false;
    return validate;
  })
  @IsString()
  title?: string;

  @ValidateIf((o) => {
    let validate = true;
    if (o.title) validate = false;
    if (o.status) validate = false;
    return validate;
  })
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
