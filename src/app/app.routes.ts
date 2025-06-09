import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { noAuthGuard } from './guards/no-auth.guard';

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
];

