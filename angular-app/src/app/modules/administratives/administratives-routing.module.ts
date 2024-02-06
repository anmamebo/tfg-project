import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { administrativeResolver } from 'src/app/core/resolvers/administrative.resolver';
import { AdministrativesCreatePageComponent } from './pages/administratives-create-page/administratives-create-page.component';
import { AdministrativesEditPageComponent } from './pages/administratives-edit-page/administratives-edit-page.component';
import { AdministrativesPageComponent } from './pages/administratives-page/administratives-page.component';
import { AdministrativesViewPageComponent } from './pages/administratives-view-page/administratives-view-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrativesPageComponent,
    title: 'Administrativos | HospitalSys',
  },
  {
    path: 'crear',
    component: AdministrativesCreatePageComponent,
    title: 'Crear administrativo | HospitalSys',
  },
  {
    path: ':id',
    component: AdministrativesViewPageComponent,
    title: 'Ver administrativo | HospitalSys',
    resolve: {
      data: administrativeResolver, // Resolver para obtener los datos del administrativo
    },
  },
  {
    path: 'editar/:id',
    component: AdministrativesEditPageComponent,
    title: 'Editar administrativo | HospitalSys',
    resolve: {
      data: administrativeResolver, // Resolver para obtener los datos del administrativo
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrativesRoutingModule {}
