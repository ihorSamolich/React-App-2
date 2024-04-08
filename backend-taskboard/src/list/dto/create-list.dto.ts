import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateListDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsInt()
  boardId: number;
}
