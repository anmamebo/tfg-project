import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appointmentForDoctorResolver } from 'src/app/core/resolvers/appointment.resolver';
import { AppointmentsDoctorPageComponent } from './pages/appointments-doctor-page/appointments-doctor-page.component';
import { AppointmentsHistoricalDoctorPageComponent } from './pages/appointments-historical-doctor-page/appointments-historical-doctor-page.component';
import { AppointmentsViewDoctorPageComponent } from './pages/appointments-view-doctor-page/appointments-view-doctor-page.component';

const routes: Routes = [
  {
    path: 'mis-citas',
    component: AppointmentsDoctorPageComponent,
    title: 'Citas | HospitalSys',
  },
  {
    path: 'historial',
    component: AppointmentsHistoricalDoctorPageComponent,
    title: 'Historial de citas | HospitalSys',
  },
  {
    path: ':id',
    component: AppointmentsViewDoctorPageComponent,
    title: 'Cita | HospitalSys',
    resolve: {
      data: appointmentForDoctorResolver, // Resolver para obtener los datos de la cita
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {}
