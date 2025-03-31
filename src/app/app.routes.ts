import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./core/components/home/home.component').then(
        (comp) => comp.HomeComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
