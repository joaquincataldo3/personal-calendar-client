import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// if logged, then return automatically to calendar
// this is to prevent going to sign in or register if logged
export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map((res) => {
      if (res.statusCode === 200) {
        router.navigate(['/calendar']);
        return false;
      }
      return true; 
    }),
    catchError(() => {
      const currentUrl = state.url;
      if (currentUrl !== '/sign-in' && currentUrl !== '/register') {
        router.navigate(['/sign-in']);
      }
      return of(true);
    })
  );
};