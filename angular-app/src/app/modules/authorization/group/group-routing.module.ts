import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupPageComponent } from './pages/group-page/group-page.component';
import { GroupEditPageComponent } from "./pages/group-edit-page/group-edit-page.component";


const routes: Routes = [
  {
    path: '',
    component: GroupPageComponent,
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
