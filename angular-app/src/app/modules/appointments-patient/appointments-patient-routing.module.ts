import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsPatientPageComponent } from './pages/appointments-patient-page/appointments-patient-page.component';
import { AppointmentsHistoricalPatientPageComponent } from './pages/appointments-historical-patient-page/appointments-historical-patient-page.component';

const routes: Routes = [
  {
    path: 'mis-citas',
    component: AppointmentsPatientPageComponent,
    title: 'Mis Citas | HospitalSys',
  },
  {
    path: 'historial',
    component: AppointmentsHistoricalPatientPageComponent,
    title: 'Historial Citas | HospitalSys',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsPatientRoutingModule {}
