import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROLES } from 'src/app/core/constants/roles.constants';
import { roleGuard } from 'src/app/core/guards/role.guard';

const routes: Routes = [
  {
    path: 'grupos',
    loadChildren: () =>
      import('./group/group.module').then((m) => m.GroupModule),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN] },
  },
  {
    path: 'permisos',
    loadChildren: () =>
      import('./permission/permission.module').then((m) => m.PermissionModule),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
