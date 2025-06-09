import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';
import { IApiResponse } from '../../interfaces/interfaces';

// if not logged, redirect to sign in 
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map((res: IApiResponse) => {
      if(res.statusCode === 200){
        return true;
      }
      return false;
    }),
    catchError(() => {
      router.navigate(['/sign-in']);
      return of(false);
    })
  );
};