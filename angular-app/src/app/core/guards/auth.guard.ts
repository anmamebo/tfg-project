import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

/**
 * Función de guardia de ruta que verifica si el usuario está autenticado antes de permitir el acceso a la ruta.
 * @param {object} route - Información sobre la ruta que se está intentando activar.
 * @param {object} state - Estado de la ruta que se está intentando activar.
 * @returns {boolean} - Verdadero si el usuario está autenticado y puede acceder a la ruta, falso de lo contrario.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLogin()) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
