import { IsDateString, IsInt, IsString } from 'class-validator';
export class CreateHistoryDto {
  @IsString()
  body: string;

  @IsDateString()
  date: Date;

  @IsInt()
  taskId: number;
}
