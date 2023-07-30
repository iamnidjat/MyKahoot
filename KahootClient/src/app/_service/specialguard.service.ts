import {inject, Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn} from '@angular/router';
@Injectable({ providedIn: 'root' })

class PermissionsService {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('Login') || localStorage.getItem('newLogin') || localStorage.getItem('Guest')) {
      return true;
    }

    this.router.navigate(['app/404-page-form']);

    return false;
  }
}

export const Specialguard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}


