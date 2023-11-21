import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientsPageComponent } from "./pages/patients-page/patients-page.component";
import { PatientsEditPageComponent } from "./pages/patients-edit-page/patients-edit-page.component";
import { PatientsViewPageComponent } from "./pages/patients-view-page/patients-view-page.component";
import { PatientsCreatePageComponent } from "./pages/patients-create-page/patients-create-page.component";

import { patientResolver } from "src/app/core/resolvers/patient.resolver";

const routes: Routes = [
  {
    path: '',
    component: PatientsPageComponent,
    title: 'Pacientes | HospitalSys',
  },
  {
    path: 'crear',
    component: PatientsCreatePageComponent,
    title: 'Crear paciente | HospitalSys',
  },
  {
    path: ':id',
    component: PatientsViewPageComponent,
    title: 'Ver paciente | HospitalSys',
    resolve: {
      data: patientResolver // Resolver para obtener los datos del paciente
    }
  },
  {
    path: 'editar/:id',
    component: PatientsEditPageComponent,
    title: 'Editar paciente | HospitalSys',
    resolve: {
      data: patientResolver // Resolver para obtener los datos del paciente
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
