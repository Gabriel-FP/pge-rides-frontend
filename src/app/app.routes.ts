import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ClientDashboardComponent } from './features/client/client-dashboard/client-dashboard.component';
import { DriverDashboardComponent } from './features/driver/driver-dashboard/driver-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'client/dashboard',
    component: ClientDashboardComponent
  },
  {
    path: 'driver/dashboard',
    component: DriverDashboardComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
