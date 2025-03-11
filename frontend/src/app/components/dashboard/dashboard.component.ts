import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HiiroService } from '../../services/hiiro.service';
import { WebhookResponse } from '../../models/hiiro.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Hiiro API Integration Demo</h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Documents Card -->
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg font-medium text-gray-900">Documents</h3>
                  <p class="mt-1 text-sm text-gray-500">Upload and manage documents for data extraction</p>
                  <div class="mt-4">
                    <a routerLink="/documents" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      View Documents <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Templates Card -->
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg font-medium text-gray-900">Templates</h3>
                  <p class="mt-1 text-sm text-gray-500">Manage extraction templates for your documents</p>
                  <div class="mt-4">
                    <a routerLink="/templates" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      View Templates <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Groups Card -->
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg font-medium text-gray-900">Groups</h3>
                  <p class="mt-1 text-sm text-gray-500">Organize documents into logical groups</p>
                  <div class="mt-4">
                    <a routerLink="/groups" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      View Groups <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Webhooks -->
            <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Webhook Events</h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  Latest events from Hiiro API (refreshed every 5 seconds)
                </p>
              </div>
              <div class="border-t border-gray-200">
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div class="text-sm font-medium text-gray-500">Event Type</div>
                  <div class="text-sm font-medium text-gray-500">Time</div>
                  <div class="text-sm font-medium text-gray-500">Details</div>
                </div>
                <div *ngIf="webhooks && webhooks.webhooks.length > 0; else noWebhooks">
                  <div *ngFor="let webhook of webhooks.webhooks" class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t border-gray-200">
                    <div class="text-sm text-gray-900">{{ webhook['type'] || 'Unknown' }}</div>
                    <div class="text-sm text-gray-500">{{ webhook.receivedAt | date:'medium' }}</div>
                    <div class="text-sm text-gray-500">
                      <a routerLink="/webhooks/{{ webhook.id }}" class="text-indigo-600 hover:text-indigo-500">
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
                <div class="bg-gray-50 px-4 py-4 sm:px-6 text-right">
                  <a routerLink="/webhooks" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View All Webhooks <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  webhooks: WebhookResponse | null = null;

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
    this.hiiroService.pollWebhooks().subscribe(
      (data) => {
        this.webhooks = data;
      },
      (error) => {
        console.error('Error polling webhooks:', error);
      }
    );
  }
} 