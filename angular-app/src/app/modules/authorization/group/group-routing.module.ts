import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { groupResolver } from '@app/core/resolvers/group.resolver';
import { GroupEditPageComponent } from './pages/group-edit-page/group-edit-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { GroupViewPageComponent } from './pages/group-view-page/group-view-page.component';

const routes: Routes = [
  {
    path: '',
    component: GroupPageComponent,
    title: 'Grupos (roles) | HospitalSys',
  },
  {
    path: ':id',
    component: GroupViewPageComponent,
    title: 'Ver grupo | HospitalSys',
    resolve: {
      data: groupResolver, // Resolver para obtener los datos del grupo
    },
  },
  {
    path: 'editar/:id',
    component: GroupEditPageComponent,
    title: 'Editar grupo | HospitalSys',
    resolve: {
      data: groupResolver, // Resolver para obtener los datos del grupo
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
