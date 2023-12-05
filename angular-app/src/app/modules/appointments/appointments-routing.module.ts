import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsPageComponent } from "./pages/appointments-page/appointments-page.component";
import { AppointmentsViewPageComponent } from "./pages/appointments-view-page/appointments-view-page.component";

import { appointmentForDoctorResolver } from "src/app/core/resolvers/appointment.resolver";

const routes: Routes = [
  {
    path: '',
    component: AppointmentsPageComponent,
    title: 'Citas | HospitalSys',
  },
  {
    path: ':id',
    component: AppointmentsViewPageComponent,
    title: 'Cita | HospitalSys',
    resolve: {
      data: appointmentForDoctorResolver // Resolver para obtener los datos de la cita
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
