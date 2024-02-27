import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROLES } from '@app/core/constants/roles.constants';
import { roleGuard } from '@app/core/guards/role.guard';

const routes: Routes = [
  {
    path: 'grupos',
    loadChildren: () =>
      import('./group/group.module').then((m) => m.GroupModule),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
