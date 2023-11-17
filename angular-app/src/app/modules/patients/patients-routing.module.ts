import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientsPageComponent } from "./pages/patients-page/patients-page.component";

const routes: Routes = [
  {
    path: '',
    component: PatientsPageComponent,
    title: 'Pacientes | HospitalSys',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
