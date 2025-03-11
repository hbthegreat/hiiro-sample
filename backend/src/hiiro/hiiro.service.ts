import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { 
  DocumentDto, 
  GroupDto, 
  TemplateDto,
} from './dto';

@Injectable()
export class HiiroService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiUrl = this.configService.get<string>('hiiro.apiUrl') || 'https://api.fsco.io/v2';
    this.apiKey = this.configService.get<string>('hiiro.apiKey') || '';
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  // Document endpoints
  async createDocument(document: DocumentDto) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.post(`${this.apiUrl}/document`, document, { 
          headers: this.getHeaders() 
        })
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getDocuments(groupId: string, page = 0, limit = 10) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get(`${this.apiUrl}/document`, {
          params: { groupId, page, limit },
          headers: this.getHeaders(),
        })
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getDocument(documentId: string) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get(`${this.apiUrl}/document/${documentId}`, {
          headers: this.getHeaders(),
        })
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async updateDocument(documentId: string, document: string) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.put(
          `${this.apiUrl}/document/${documentId}`,
          { document },
          { headers: this.getHeaders() }
        )
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async deleteDocument(documentId: string) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.delete(`${this.apiUrl}/document/${documentId}`, {
          headers: this.getHeaders(),
        })
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  // Template endpoints
  async createTemplate(template: TemplateDto) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.post(`${this.apiUrl}/document/template`, template, {
          headers: this.getHeaders(),
        })
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getTemplates(tag: string, skip = 0, limit = 10) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get(`${this.apiUrl}/document/template`, {
          params: { tag, skip, limit },
          headers: this.getHeaders(),
        })
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getTemplate(templateId: string) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get(`${this.apiUrl}/document/template/${templateId}`, {
          headers: this.getHeaders(),
        })
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async updateTemplate(templateId: string, template: TemplateDto) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.put(
          `${this.apiUrl}/document/template/${templateId}`,
          template,
          { headers: this.getHeaders() }
        )
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async deleteTemplate(templateId: string) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.delete(`${this.apiUrl}/document/template/${templateId}`, {
          headers: this.getHeaders(),
        })
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  // Group endpoints
  async createGroup(group: GroupDto) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.post(`${this.apiUrl}/document/group`, group, {
          headers: this.getHeaders(),
        })
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getGroups(skip = 1, limit = 10) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get(`${this.apiUrl}/document/group`, {
          params: { skip, limit },
          headers: this.getHeaders(),
        })
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getGroup(groupId: string) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get(`${this.apiUrl}/document/group/${groupId}`, {
          headers: this.getHeaders(),
        })
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async updateGroup(groupId: string, group: GroupDto) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.put(
          `${this.apiUrl}/document/group/${groupId}`,
          group,
          { headers: this.getHeaders() }
        )
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async deleteGroup(groupId: string) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.delete(`${this.apiUrl}/document/group/${groupId}`, {
          headers: this.getHeaders(),
        })
      );
      return data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  // Utility method to handle API errors
  private handleApiError(error: any) {
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.data?.status || 'An error occurred while communicating with Hiiro API';
    throw new HttpException(message, status);
  }
}
