import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { TagDto } from './tag.dto';

export enum GroupStatus {
  INPROGRESS = 'INPROGRESS',
  TODO = 'TODO',
  COMPLETE = 'COMPLETE',
  ARCHIVED = 'ARCHIVED',
}

export enum GroupPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  EMPTY = 'EMPTY',
}

export class GroupDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(GroupStatus)
  status: GroupStatus;

  @IsEnum(GroupPriority)
  priority: GroupPriority;

  @IsArray()
  @IsOptional()
  tags?: TagDto[];
} 