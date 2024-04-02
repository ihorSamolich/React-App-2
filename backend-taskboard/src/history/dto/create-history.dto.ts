import { IsDateString, IsInt, IsString } from 'class-validator';
export class CreateHistoryDto {
  @IsString()
  action: string;

  @IsString()
  field: string;

  @IsString()
  newValue: string;

  @IsString()
  taskName: string;

  @IsString()
  oldValue: string;

  @IsDateString()
  date: Date;

  @IsInt()
  taskId: number;
}

// @IsString()
// body: string;
//
// @IsDateString()
// date: Date;
//
// @IsInt()
// taskId: number;
