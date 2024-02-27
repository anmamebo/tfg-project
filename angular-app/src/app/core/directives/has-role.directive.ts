import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';

/**
 * Directiva para mostrar u ocultar elementos basados en los roles del usuario.
 * Si el usuario tiene al menos uno de los roles especificados, se muestra el elemento.
 * @Directive
 * @example
 * <div *appHasRole="['Administrativo', 'Paciente']">Contenido visible para administrativos o pacientes</div>
 */
@Directive({
  selector: '[appHasRole]',
  inputs: ['appHasRole'],
})
export class HasRoleDirective {
  /**
   * Define los roles necesarios para mostrar el elemento.
   * @param {string[]} roles - Lista de roles requeridos para mostrar el elemento.
   */
  @Input() set appHasRole(roles: string[]) {
    const userRoles = this._authService.getRolesFromToken();
    const hasRequiredRole = roles.some((role) => userRoles.includes(role));
    this._viewContainerRef.clear();

    if (hasRequiredRole) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
  }

  constructor(
    private _authService: AuthService,
    private _templateRef: TemplateRef<any>,
    private _viewContainerRef: ViewContainerRef
  ) {}
}
