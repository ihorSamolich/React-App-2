import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  dueDate: Date;

  @IsInt()
  listId: number;

  @IsInt()
  priorityId: number;
}
