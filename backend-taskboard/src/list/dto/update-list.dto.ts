import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateListDto extends PartialType(CreateListDto) {
  @IsString()
  @MinLength(3)
  name: string;
}
