import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HiiroService } from '../../services/hiiro.service';
import { WebhookResponse } from '../../models/hiiro.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-webhooks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Webhooks</h1>
          <a routerLink="/" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Back to Dashboard
          </a>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Webhook Events</h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    Real-time events from Hiiro API (refreshed every 5 seconds)
                  </p>
                </div>
                <button 
                  (click)="clearWebhooks()"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Clear All
                </button>
              </div>
              <div class="border-t border-gray-200">
                <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                  <div class="text-sm font-medium text-gray-500">Event Type</div>
                  <div class="text-sm font-medium text-gray-500">Time</div>
                  <div class="text-sm font-medium text-gray-500">ID</div>
                  <div class="text-sm font-medium text-gray-500">Actions</div>
                </div>
                <div *ngIf="webhooks && webhooks.webhooks.length > 0; else noWebhooks">
                  <div *ngFor="let webhook of webhooks.webhooks" class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 border-t border-gray-200">
                    <div class="text-sm text-gray-900">{{ webhook['type'] || 'Unknown' }}</div>
                    <div class="text-sm text-gray-500">{{ webhook.receivedAt | date:'medium' }}</div>
                    <div class="text-sm text-gray-500 truncate">{{ webhook.id }}</div>
                    <div class="text-sm text-gray-500">
                      <a [routerLink]="['/webhooks', webhook.id]" class="text-indigo-600 hover:text-indigo-900">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
                <ng-template #noWebhooks>
                  <div class="bg-white px-4 py-5 sm:px-6 text-center text-gray-500">
                    No webhook events received yet
                  </div>
                </ng-template>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class WebhooksComponent implements OnInit, OnDestroy {
  webhooks: WebhookResponse | null = null;
  private webhookSubscription: Subscription | null = null;

  constructor(private hiiroService: HiiroService) {}

  ngOnInit(): void {
    // Get initial webhooks
    this.hiiroService.getWebhooks().subscribe(
      (data) => {
        this.webhooks = data;
      },
      (error) => {
        console.error('Error fetching webhooks:', error);
      }
    );

    // Set up polling for new webhooks
    this.webhookSubscription = this.hiiroService.pollWebhooks().subscribe(
      (data) => {
        this.webhooks = data;
      },
      (error) => {
        console.error('Error polling webhooks:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.webhookSubscription) {
      this.webhookSubscription.unsubscribe();
    }
  }

  clearWebhooks(): void {
    this.hiiroService.clearWebhooks().subscribe(
      () => {
        // Refresh the list after clearing
        this.hiiroService.getWebhooks().subscribe(
          (data) => {
            this.webhooks = data;
          }
        );
      },
      (error) => {
        console.error('Error clearing webhooks:', error);
      }
    );
  }
} 