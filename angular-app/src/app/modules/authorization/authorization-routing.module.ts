import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'grupos',
    loadChildren: () =>
      import('./group/group.module').then((m) => m.GroupModule),
  },
  {
    path: 'permisos',
    loadChildren: () =>
      import('./permission/permission.module').then((m) => m.PermissionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
