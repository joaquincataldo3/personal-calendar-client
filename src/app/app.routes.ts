import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { noAuthGuard } from './guards/no-auth.guard';
import { CalendarDashboardComponent } from './components/calendar-dashboard/calendar-dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'register', 
    component: RegisterComponent,
    canActivate: [noAuthGuard] 
  },
  { 
    path: 'sign-in', 
    component: SignInComponent ,
    canActivate: [noAuthGuard]
  },
  {
    path: 'calendar',
    component: CalendarDashboardComponent,
    canActivate: [authGuard]
  }
];

