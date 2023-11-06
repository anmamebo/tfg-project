import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupPageComponent } from './pages/group-page/group-page.component';
import { PermissionPageComponent } from './pages/permission-page/permission-page.component';

const routes: Routes = [
  {
    path: 'grupos',
    component: GroupPageComponent,
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
export class ProfileRoutingModule {}
