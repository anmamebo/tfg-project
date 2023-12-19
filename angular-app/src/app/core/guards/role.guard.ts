import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const rolesRequired = route.data['roles'] as string[];

  if (rolesRequired && rolesRequired.length > 0) {
    const userRoles = authService.getRolesFromToken();
    const hasRequiredRole = rolesRequired.some((role) =>
      userRoles.includes(role)
    );

    if (hasRequiredRole) {
      return true;
    } else {
      router.navigate(['**']);
      return false;
    }
  }

  return true;
};
