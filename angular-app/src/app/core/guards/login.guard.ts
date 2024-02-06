import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

/**
 * Función de guardia de ruta que evita que los usuarios autenticados accedan a la página de inicio de sesión.
 * Redirige a la página principal si el usuario ya ha iniciado sesión.
 * @param {object} route - Información sobre la ruta que se está intentando activar.
 * @param {object} state - Estado de la ruta que se está intentando activar.
 * @returns {boolean} - Verdadero si el usuario no está autenticado y puede acceder a la página de inicio de sesión, falso de lo contrario.
 */
export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogin()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
