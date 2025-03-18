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
      <!-- Navbar -->
      <nav class="bg-indigo-600">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="text-white font-bold text-xl">Hiiro API Demo</span>
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a routerLink="/" class="text-white px-3 py-2 rounded-md text-sm font-medium bg-indigo-700" aria-current="page">Dashboard</a>
                  <a routerLink="/documents" class="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">Documents</a>
                  <a routerLink="/templates" class="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">Templates</a>
                  <a routerLink="/groups" class="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">Groups</a>
                  <a routerLink="/webhooks" class="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">Webhooks</a>
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <a href="https://api.fsco.io/docs" target="_blank" class="p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                  <span class="sr-only">View API Docs</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <button type="button" class="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Hiiro API Integration Demo</h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- API Error Alert -->
          <div *ngIf="apiError" class="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">
                  Unable to connect to the backend server. Please ensure it's running at http://localhost:3000.
                </p>
              </div>
              <div class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                  <button
                    (click)="apiError = false"
                    class="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <span class="sr-only">Dismiss</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

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
                
                <!-- Loading State -->
                <div *ngIf="isLoading" class="bg-white px-4 py-10 sm:px-6 text-center text-gray-500">
                  <svg class="animate-spin h-6 w-6 text-indigo-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p>Loading webhook events...</p>
                </div>
                
                <!-- Webhook Data -->
                <div *ngIf="!isLoading && webhooks && webhooks.webhooks.length > 0; else noWebhooks">
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
                  <div *ngIf="!isLoading" class="bg-white px-4 py-5 sm:px-6 text-center text-gray-500">
                    No webhook events received yet. Try sending a request to the webhook endpoint.
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
  isLoading = true;
  apiError = false;

  constructor(private hiiroService: HiiroService) {}

  ngOnInit(): void {
    // Get initial webhooks
    this.fetchWebhooks();

    // Set up polling for new webhooks
    this.hiiroService.pollWebhooks().subscribe(
      (data) => {
        this.webhooks = data;
        this.isLoading = false;
        this.apiError = false;
      },
      (error) => {
        console.error('Error polling webhooks:', error);
        this.apiError = true;
      }
    );
  }

  fetchWebhooks(): void {
    this.isLoading = true;
    this.hiiroService.getWebhooks().subscribe(
      (data) => {
        this.webhooks = data;
        this.isLoading = false;
        this.apiError = false;
      },
      (error) => {
        console.error('Error fetching webhooks:', error);
        this.isLoading = false;
        this.apiError = true;
      }
    );
  }

  retryConnection(): void {
    this.fetchWebhooks();
  }
} 