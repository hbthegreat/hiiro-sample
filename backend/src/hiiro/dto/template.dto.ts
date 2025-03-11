import { IsArray, IsOptional, IsString } from 'class-validator';
import { PromptDto } from './prompt.dto';

export class TemplateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  type: string;

  @IsString()
  tag: string;

  @IsArray()
  prompts: PromptDto[];
} 