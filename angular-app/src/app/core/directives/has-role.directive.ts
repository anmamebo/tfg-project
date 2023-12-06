import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
  selector: '[appHasRole]',
  inputs: ['appHasRole'],
})
export class HasRoleDirective {
  @Input() set appHasRole(roles: string[]) {
    const userRoles = this.authService.getRolesFromToken();
    const hasRequiredRole = roles.some((role) => userRoles.includes(role));
    this.viewContainerRef.clear();

    if (hasRequiredRole) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}
}
