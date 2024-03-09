import { CanActivateFn } from '@angular/router';

export const exitTestProcessGuard: CanActivateFn = (route, state) => {
  return confirm("Are you sure you want to leave the page?");
};
