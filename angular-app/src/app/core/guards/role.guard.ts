import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

/**
 * Función de guardia de ruta que restringe el acceso a rutas basado en los roles proporcionados.
 * Redirige a una ruta no autorizada si el usuario no tiene los roles necesarios.
 * @param {object} route - Información sobre la ruta que se está intentando activar.
 * @param {object} state - Estado de la ruta que se está intentando activar.
 * @returns {boolean} - Verdadero si el usuario tiene los roles necesarios para acceder a la ruta, falso de lo contrario.
 */
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
