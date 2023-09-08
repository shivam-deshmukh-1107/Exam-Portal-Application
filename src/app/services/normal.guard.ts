import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from './login.service';

export const normalGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const login = inject(LoginService);
  const router = inject(Router);
  if (login.isLoggedIn() && login.getUserRole() == 'NORMAL') {
    return true;
  }
  router.navigate(['login']);
  return false;
};
