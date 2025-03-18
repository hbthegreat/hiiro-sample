import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-indigo-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span class="text-white font-bold text-xl">Hiiro API Demo</span>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a 
                  routerLink="/" 
                  [class]="activePage === 'dashboard' ? 
                    'text-white px-3 py-2 rounded-md text-sm font-medium bg-indigo-700' : 
                    'text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium'"
                >
                  Dashboard
                </a>
                <a 
                  routerLink="/documents" 
                  [class]="activePage === 'documents' ? 
                    'text-white px-3 py-2 rounded-md text-sm font-medium bg-indigo-700' : 
                    'text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium'"
                >
                  Documents
                </a>
                <a 
                  routerLink="/templates" 
                  [class]="activePage === 'templates' ? 
                    'text-white px-3 py-2 rounded-md text-sm font-medium bg-indigo-700' : 
                    'text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium'"
                >
                  Templates
                </a>
                <a 
                  routerLink="/groups" 
                  [class]="activePage === 'groups' ? 
                    'text-white px-3 py-2 rounded-md text-sm font-medium bg-indigo-700' : 
                    'text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium'"
                >
                  Groups
                </a>
                <a 
                  routerLink="/webhooks" 
                  [class]="activePage === 'webhooks' ? 
                    'text-white px-3 py-2 rounded-md text-sm font-medium bg-indigo-700' : 
                    'text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium'"
                >
                  Webhooks
                </a>
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
            <button 
              type="button" 
              (click)="toggleMobileMenu()"
              class="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" 
              aria-controls="mobile-menu" 
              [attr.aria-expanded]="mobileMenuOpen"
            >
              <span class="sr-only">Open main menu</span>
              <svg 
                class="block h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path 
                  *ngIf="!mobileMenuOpen" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
                <path 
                  *ngIf="mobileMenuOpen" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div 
        id="mobile-menu" 
        [class.hidden]="!mobileMenuOpen"
        class="md:hidden"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a 
            routerLink="/" 
            (click)="mobileMenuOpen = false"
            [class]="activePage === 'dashboard' ? 
              'bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium' : 
              'text-white hover:bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium'"
          >
            Dashboard
          </a>
          <a 
            routerLink="/documents" 
            (click)="mobileMenuOpen = false"
            [class]="activePage === 'documents' ? 
              'bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium' : 
              'text-white hover:bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium'"
          >
            Documents
          </a>
          <a 
            routerLink="/templates" 
            (click)="mobileMenuOpen = false"
            [class]="activePage === 'templates' ? 
              'bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium' : 
              'text-white hover:bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium'"
          >
            Templates
          </a>
          <a 
            routerLink="/groups" 
            (click)="mobileMenuOpen = false"
            [class]="activePage === 'groups' ? 
              'bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium' : 
              'text-white hover:bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium'"
          >
            Groups
          </a>
          <a 
            routerLink="/webhooks" 
            (click)="mobileMenuOpen = false"
            [class]="activePage === 'webhooks' ? 
              'bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium' : 
              'text-white hover:bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium'"
          >
            Webhooks
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {
  @Input() activePage: string = 'dashboard';
  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
} 