import { IsInt, IsString } from 'class-validator';

export class CreateListDto {
  @IsString()
  name: string;

  @IsInt()
  boardId: number;
}
