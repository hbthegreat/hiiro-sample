import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum TagColor {
  BLUE = 'Blue',
  PINK = 'Pink',
  PURPLE = 'Purple',
  ORANGE = 'Orange',
}

export class TagDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  nameHash?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TagColor)
  color: TagColor;

  @IsString()
  @IsOptional()
  status?: string;
} 