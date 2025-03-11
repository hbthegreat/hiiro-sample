import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HiiroService } from '../../services/hiiro.service';
import { Group, PaginatedResponse, GroupStatus, GroupPriority } from '../../models/hiiro.models';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Groups</h1>
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
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Group List</h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    Organize documents into logical groups
                  </p>
                </div>
                <button 
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Group
                </button>
              </div>
              <div class="border-t border-gray-200">
                <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                  <div class="text-sm font-medium text-gray-500">Name</div>
                  <div class="text-sm font-medium text-gray-500">Status</div>
                  <div class="text-sm font-medium text-gray-500">Priority</div>
                  <div class="text-sm font-medium text-gray-500">Actions</div>
                </div>
                <div *ngIf="groups && groups.items.length > 0; else noGroups">
                  <div *ngFor="let group of groups.items" class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 border-t border-gray-200">
                    <div class="text-sm text-gray-900">{{ group.name }}</div>
                    <div class="text-sm text-gray-500">
                      <span [ngClass]="{
                        'px-2 py-1 text-xs font-medium rounded-full': true,
                        'bg-green-100 text-green-800': group.status === 'COMPLETE',
                        'bg-yellow-100 text-yellow-800': group.status === 'INPROGRESS',
                        'bg-blue-100 text-blue-800': group.status === 'TODO',
                        'bg-gray-100 text-gray-800': group.status === 'ARCHIVED'
                      }">
                        {{ group.status }}
                      </span>
                    </div>
                    <div class="text-sm text-gray-500">
                      <span [ngClass]="{
                        'px-2 py-1 text-xs font-medium rounded-full': true,
                        'bg-red-100 text-red-800': group.priority === 'HIGH',
                        'bg-yellow-100 text-yellow-800': group.priority === 'MEDIUM',
                        'bg-blue-100 text-blue-800': group.priority === 'LOW',
                        'bg-gray-100 text-gray-800': group.priority === 'EMPTY'
                      }">
                        {{ group.priority }}
                      </span>
                    </div>
                    <div class="text-sm text-gray-500 space-x-2">
                      <button class="text-indigo-600 hover:text-indigo-900">View</button>
                      <button class="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </div>
                </div>
                <ng-template #noGroups>
                  <div class="bg-white px-4 py-5 sm:px-6 text-center text-gray-500">
                    No groups found. Create a group to get started.
                  </div>
                </ng-template>
                <div *ngIf="groups && groups.items.length > 0" class="bg-white px-4 py-4 sm:px-6 flex justify-between">
                  <button 
                    [disabled]="!groups.hasPrev"
                    [class.opacity-50]="!groups.hasPrev"
                    class="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <div class="text-sm text-gray-700">
                    Page {{ groups.page + 1 }} of {{ Math.ceil(groups.total / groups.perPage) }}
                  </div>
                  <button 
                    [disabled]="!groups.hasNext"
                    [class.opacity-50]="!groups.hasNext"
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
export class GroupsComponent implements OnInit {
  groups: PaginatedResponse<Group> | null = null;
  Math = Math; // Make Math available in the template

  constructor(private hiiroService: HiiroService) {}

  ngOnInit(): void {
    this.hiiroService.getGroups().subscribe(
      (data) => {
        this.groups = data;
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }
} 