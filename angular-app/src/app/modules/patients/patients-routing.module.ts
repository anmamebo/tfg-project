import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientsPageComponent } from "./pages/patients-page/patients-page.component";
import { PatientsEditPageComponent } from "./pages/patients-edit-page/patients-edit-page.component";
import { PatientsViewPageComponent } from "./pages/patients-view-page/patients-view-page.component";

const routes: Routes = [
  {
    path: '',
    component: PatientsPageComponent,
    title: 'Pacientes | HospitalSys',
  },
  {
    path: ':id',
    component: PatientsViewPageComponent,
    title: 'Ver paciente | HospitalSys',
  },
  {
    path: 'editar/:id',
    component: PatientsEditPageComponent,
    title: 'Editar paciente | HospitalSys',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
