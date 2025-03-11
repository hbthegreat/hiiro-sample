import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PromptDto } from './prompt.dto';

export class DocumentDto {
  @IsString()
  refId: string;

  @IsString()
  docExt: string;

  @IsString()
  docName: string;

  @IsString()
  docType: string;

  @IsString()
  @IsOptional()
  uploadBatchId?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsString()
  source: string;

  @IsString()
  @IsOptional()
  templateId?: string;

  @IsString()
  @IsOptional()
  groupId?: string;

  @IsOptional()
  prompts?: PromptDto[];

  @IsString()
  @IsOptional()
  bulkDocumentId?: string;

  @IsString()
  @IsOptional()
  providerModelId?: string;
} 