import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartmentsPageComponent } from './pages/departments-page/departments-page.component';
import { DepartmentsViewPageComponent } from './pages/departments-view-page/departments-view-page.component';
import { DepartmentsEditPageComponent } from './pages/departments-edit-page/departments-edit-page.component';
import { DepartmentsCreatePageComponent } from './pages/departments-create-page/departments-create-page.component';

import { departmentResolver } from 'src/app/core/resolvers/department.resolver';

import { roleGuard } from 'src/app/core/guards/role.guard';
import { ROLES } from 'src/app/core/constants/roles.constants';

const routes: Routes = [
  {
    path: '',
    component: DepartmentsPageComponent,
    title: 'Departamentos | HospitalSys',
  },
  {
    path: 'crear',
    component: DepartmentsCreatePageComponent,
    title: 'Crear departamento | HospitalSys',
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN] },
  },
  {
    path: ':id',
    component: DepartmentsViewPageComponent,
    title: 'Ver departamento | HospitalSys',
    resolve: {
      data: departmentResolver, // Resolver para obtener los datos del departamento
    },
  },
  {
    path: 'editar/:id',
    component: DepartmentsEditPageComponent,
    title: 'Editar departamento | HospitalSys',
    resolve: {
      data: departmentResolver, // Resolver para obtener los datos del departamento
    },
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentsRoutingModule {}
