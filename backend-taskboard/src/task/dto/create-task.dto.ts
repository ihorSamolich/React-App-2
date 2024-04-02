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

// {
//   "name": "444444",
//   "description":"descriptiondescriptiondescription",
//   "dueDate":"2024-11-05T13:15:30Z",
//   "listId":1,
//   "priorityId" : 1
// }
