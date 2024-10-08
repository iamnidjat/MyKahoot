import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  return authService.checkAuth();
};
