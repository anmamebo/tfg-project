import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appointmentForDoctorResolver } from 'src/app/core/resolvers/appointment.resolver';
import { AppointmentsHistoricalViewPageComponent } from './pages/appointments-historical-view-page/appointments-historical-view-page.component';
import { AppointmentsPageComponent } from './pages/appointments-page/appointments-page.component';
import { AppointmentsViewPageComponent } from './pages/appointments-view-page/appointments-view-page.component';

const routes: Routes = [
  {
    path: 'mis-citas',
    component: AppointmentsPageComponent,
    title: 'Citas | HospitalSys',
  },
  {
    path: 'historial',
    component: AppointmentsHistoricalViewPageComponent,
    title: 'Historial de citas | HospitalSys',
  },
  {
    path: ':id',
    component: AppointmentsViewPageComponent,
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
