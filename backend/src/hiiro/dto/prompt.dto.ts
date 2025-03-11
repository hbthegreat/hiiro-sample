import { IsArray, IsOptional, IsString } from 'class-validator';

export class PromptDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  fieldType: string;

  @IsString()
  format: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  itemType?: string;

  @IsArray()
  @IsOptional()
  children?: any[];
} 