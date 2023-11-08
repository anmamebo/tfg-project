import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupPageComponent } from './pages/groups/group-page/group-page.component';
import { GroupEditPageComponent } from "./pages/groups/group-edit-page/group-edit-page.component";
import { PermissionPageComponent } from './pages/permissions/permission-page/permission-page.component';

const routes: Routes = [
  {
    path: 'grupos',
    component: GroupPageComponent,
  },
  {
    path: 'grupos/editar/:id',
    component: GroupEditPageComponent,
  },
  {
    path: 'permisos',
    component: PermissionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
