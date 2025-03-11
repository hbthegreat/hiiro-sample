import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  Document,
  Group,
  Template,
  PaginatedResponse,
  WebhookResponse,
  Webhook
} from '../models/hiiro.models';

@Injectable({
  providedIn: 'root'
})
export class HiiroService {
  private apiUrl = 'http://localhost:3000/api/hiiro';
  private pollingInterval = 5000; // 5 seconds

  constructor(private http: HttpClient) { }

  // Document endpoints
  createDocument(document: Document): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/document`, document);
  }

  getDocuments(groupId: string, page = 0, limit = 10): Observable<PaginatedResponse<Document>> {
    const params = new HttpParams()
      .set('groupId', groupId)
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    return this.http.get<PaginatedResponse<Document>>(`${this.apiUrl}/document`, { params });
  }

  getDocument(id: string): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/document/${id}`);
  }

  updateDocument(id: string, document: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/document/${id}`, { document });
  }

  deleteDocument(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/document/${id}`);
  }

  // Template endpoints
  createTemplate(template: Template): Observable<Template> {
    return this.http.post<Template>(`${this.apiUrl}/template`, template);
  }

  getTemplates(tag: string, skip = 0, limit = 10): Observable<PaginatedResponse<Template>> {
    const params = new HttpParams()
      .set('tag', tag)
      .set('skip', skip.toString())
      .set('limit', limit.toString());
    
    return this.http.get<PaginatedResponse<Template>>(`${this.apiUrl}/template`, { params });
  }

  getTemplate(id: string): Observable<Template> {
    return this.http.get<Template>(`${this.apiUrl}/template/${id}`);
  }

  updateTemplate(id: string, template: Template): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/template/${id}`, template);
  }

  deleteTemplate(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/template/${id}`);
  }

  // Group endpoints
  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}/group`, group);
  }

  getGroups(skip = 1, limit = 10): Observable<PaginatedResponse<Group>> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());
    
    return this.http.get<PaginatedResponse<Group>>(`${this.apiUrl}/group`, { params });
  }

  getGroup(id: string): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/group/${id}`);
  }

  updateGroup(id: string, group: Group): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/group/${id}`, group);
  }

  deleteGroup(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/group/${id}`);
  }

  // Webhook endpoints
  getWebhooks(limit = 10, offset = 0): Observable<WebhookResponse> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    
    return this.http.get<WebhookResponse>(`${this.apiUrl}/webhooks`, { params });
  }

  getWebhook(id: string): Observable<Webhook> {
    return this.http.get<Webhook>(`${this.apiUrl}/webhook/${id}`);
  }

  clearWebhooks(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/webhooks`);
  }

  // Polling for webhooks
  pollWebhooks(limit = 10): Observable<WebhookResponse> {
    return interval(this.pollingInterval).pipe(
      switchMap(() => this.getWebhooks(limit, 0))
    );
  }
} 