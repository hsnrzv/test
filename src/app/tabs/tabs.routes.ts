import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { SignInGuard } from '@app/guards/sign-in-guard.service';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'gardens',
        loadComponent: () =>
          import('../gardens/gardens.component').then(
            (m) => m.GardensComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('../products/products.component').then(
            (m) => m.ProductsComponent,
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../profile/profile.component').then(
            (m) => m.ProfileComponent,
          ),
        canActivate: [SignInGuard],
      },
      {
        path: '',
        redirectTo: '/tabs/gardens',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/gardens',
    pathMatch: 'full',
  },
];
