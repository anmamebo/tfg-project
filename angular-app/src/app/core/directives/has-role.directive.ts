import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
  selector: '[appHasRole]',
  inputs: ['appHasRole'],
})
export class HasRoleDirective {
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
