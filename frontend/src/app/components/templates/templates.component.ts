import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HiiroService } from '../../services/hiiro.service';
import { Template, PaginatedResponse } from '../../models/hiiro.models';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Templates</h1>
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
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Template List</h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    Manage extraction templates for your documents
                  </p>
                </div>
                <button 
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Template
                </button>
              </div>
              <div class="border-t border-gray-200">
                <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                  <div class="text-sm font-medium text-gray-500">Name</div>
                  <div class="text-sm font-medium text-gray-500">Type</div>
                  <div class="text-sm font-medium text-gray-500">Tag</div>
                  <div class="text-sm font-medium text-gray-500">Actions</div>
                </div>
                <div *ngIf="templates && templates.items.length > 0; else noTemplates">
                  <div *ngFor="let template of templates.items" class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 border-t border-gray-200">
                    <div class="text-sm text-gray-900">{{ template.name }}</div>
                    <div class="text-sm text-gray-500">{{ template.type }}</div>
                    <div class="text-sm text-gray-500">{{ template.tag }}</div>
                    <div class="text-sm text-gray-500 space-x-2">
                      <button class="text-indigo-600 hover:text-indigo-900">View</button>
                      <button class="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </div>
                </div>
                <ng-template #noTemplates>
                  <div class="bg-white px-4 py-5 sm:px-6 text-center text-gray-500">
                    No templates found. Create a template to get started.
                  </div>
                </ng-template>
                <div *ngIf="templates && templates.items.length > 0" class="bg-white px-4 py-4 sm:px-6 flex justify-between">
                  <button 
                    [disabled]="!templates.hasPrev"
                    [class.opacity-50]="!templates.hasPrev"
                    class="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <div class="text-sm text-gray-700">
                    Page {{ templates.page + 1 }} of {{ Math.ceil(templates.total / templates.perPage) }}
                  </div>
                  <button 
                    [disabled]="!templates.hasNext"
                    [class.opacity-50]="!templates.hasNext"
                    class="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </button>
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
export class TemplatesComponent implements OnInit {
  templates: PaginatedResponse<Template> | null = null;
  Math = Math; // Make Math available in the template

  constructor(private hiiroService: HiiroService) {}

  ngOnInit(): void {
    // For demo purposes, we'll use a mock tag
    // In a real application, you would get this from a route parameter or user selection
    const mockTag = 'invoice';
    
    this.hiiroService.getTemplates(mockTag).subscribe(
      (data) => {
        this.templates = data;
      },
      (error) => {
        console.error('Error fetching templates:', error);
      }
    );
  }
} 