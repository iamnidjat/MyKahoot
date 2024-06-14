import {inject, Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn} from '@angular/router';

const REDIRECT_ROUTE: string = 'app/404-page-form';

@Injectable({ providedIn: 'root' })
class PermissionsService {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('Login')) {
      return true;
    }

    this.router.navigate([REDIRECT_ROUTE]);
    return false;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}

