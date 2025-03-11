import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HiiroService } from '../../services/hiiro.service';
import { Webhook } from '../../models/hiiro.models';

@Component({
  selector: 'app-webhook-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Webhook Details</h1>
          <a routerLink="/webhooks" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Back to Webhooks
          </a>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div *ngIf="webhook; else loading" class="bg-white shadow overflow-hidden sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Webhook Event: {{ webhook['type'] || 'Unknown' }}
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  Received at: {{ webhook.receivedAt | date:'medium' }}
                </p>
              </div>
              <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">ID</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ webhook.id }}</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Type</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ webhook['type'] || 'Unknown' }}</dd>
                  </div>
                  <div class="sm:col-span-2">
                    <dt class="text-sm font-medium text-gray-500">Raw Data</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      <pre class="bg-gray-50 p-4 rounded overflow-auto max-h-96">{{ webhookJson }}</pre>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <ng-template #loading>
              <div class="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                <p class="text-gray-500">Loading webhook details...</p>
              </div>
            </ng-template>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class WebhookDetailComponent implements OnInit {
  webhook: Webhook | null = null;
  webhookJson: string = '';

  constructor(
    private route: ActivatedRoute,
    private hiiroService: HiiroService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.hiiroService.getWebhook(id).subscribe(
          (data) => {
            this.webhook = data;
            this.webhookJson = JSON.stringify(data, null, 2);
          },
          (error) => {
            console.error('Error fetching webhook details:', error);
          }
        );
      }
    });
  }
} 