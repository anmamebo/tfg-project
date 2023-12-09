import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TreatmentsPatientPageComponent } from './pages/treatments-patient-page/treatments-patient-page.component';

const routes: Routes = [
  {
    path: 'mis-tratamientos',
    component: TreatmentsPatientPageComponent,
    title: 'Mis Tratamientos | HospitalSys',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreatmentsPatientRoutingModule {}
