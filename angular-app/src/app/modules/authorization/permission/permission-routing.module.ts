import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PermissionPageComponent } from './pages/permission-page/permission-page.component';

const routes: Routes = [
  {
    path: '',
    component: PermissionPageComponent,
    title: 'Permisos | HospitalSys',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionRoutingModule {}
