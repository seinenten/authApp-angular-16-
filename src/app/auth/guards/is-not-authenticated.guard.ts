import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces/auth-index';
import { AuthService } from '../services/auth.service';

//publicGuard  - private Guard

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject( Router );
  
  if( authService.authStatus() === AuthStatus.authenticated ){
    router.navigateByUrl('/dasboard')
    return false;
  }
  
  
  return true;
};
