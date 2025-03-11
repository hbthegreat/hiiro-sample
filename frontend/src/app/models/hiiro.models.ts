// Document interfaces
export interface Document {
  refId: string;
  docExt: string;
  docName: string;
  docType: string;
  uploadBatchId?: string;
  isPublic?: boolean;
  source: string;
  templateId?: string;
  groupId?: string;
  prompts?: Prompt[];
  bulkDocumentId?: string;
  providerModelId?: string;
}

// Prompt interfaces
export interface Prompt {
  id: string;
  name: string;
  fieldType: string;
  format: string;
  description: string;
  itemType?: string;
  children?: any[];
}

// Template interfaces
export interface Template {
  name: string;
  description?: string;
  type: string;
  tag: string;
  prompts: Prompt[];
}

// Group interfaces
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

export interface Group {
  name: string;
  description?: string;
  status: GroupStatus;
  priority: GroupPriority;
  tags?: Tag[];
}

// Tag interfaces
export enum TagColor {
  BLUE = 'Blue',
  PINK = 'Pink',
  PURPLE = 'Purple',
  ORANGE = 'Orange',
}

export interface Tag {
  id: string;
  name: string;
  nameHash?: string;
  description?: string;
  color: TagColor;
  status?: string;
}

// Pagination interface
export interface PaginatedResponse<T> {
  total: number;
  page: number;
  perPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  items: T[];
}

// Webhook interface
export interface Webhook {
  id: string;
  receivedAt: string;
  [key: string]: any;
}

export interface WebhookResponse {
  webhooks: Webhook[];
  total: number;
  hasMore: boolean;
} 