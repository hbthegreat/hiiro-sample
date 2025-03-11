import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'documents', loadComponent: () => import('./components/documents/documents.component').then(m => m.DocumentsComponent) },
  { path: 'templates', loadComponent: () => import('./components/templates/templates.component').then(m => m.TemplatesComponent) },
  { path: 'groups', loadComponent: () => import('./components/groups/groups.component').then(m => m.GroupsComponent) },
  { path: 'webhooks', loadComponent: () => import('./components/webhooks/webhooks.component').then(m => m.WebhooksComponent) },
  { path: 'webhooks/:id', loadComponent: () => import('./components/webhooks/webhook-detail.component').then(m => m.WebhookDetailComponent) },
  { path: '**', redirectTo: '' }
];
