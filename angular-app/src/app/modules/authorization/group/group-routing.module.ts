import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupPageComponent } from './pages/group-page/group-page.component';
import { GroupEditPageComponent } from "./pages/group-edit-page/group-edit-page.component";
import { GroupViewPageComponent } from "./pages/group-view-page/group-view-page.component";

const routes: Routes = [
  {
    path: '',
    component: GroupPageComponent,
  },
  {
    path: ':id',
    component: GroupViewPageComponent,
  },
  {
    path: 'editar/:id',
    component: GroupEditPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
