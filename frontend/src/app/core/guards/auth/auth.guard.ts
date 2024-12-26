import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  const jwt = inject(JwtHelperService);
  const router = inject(Router);

  if (jwt.isTokenExpired()) {
    router.navigate(['login']);
    return false;
  }

  return true;
};
