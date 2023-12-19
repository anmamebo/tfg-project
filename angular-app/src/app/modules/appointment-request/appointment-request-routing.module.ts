import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentRequestPageComponent } from './pages/appointment-request-page/appointment-request-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentRequestPageComponent,
    title: 'Solicitar Cita | HospitalSys',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRequestRoutingModule {}
