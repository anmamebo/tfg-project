import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { roleGuard } from 'src/app/core/guards/role.guard';
import { ROLES } from 'src/app/core/constants/roles.constants';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.PATIENT] },
  },
  {
    path: 'horario',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.ScheduleModule),
    canActivate: [roleGuard],
    data: { roles: [ROLES.DOCTOR] },
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.PATIENT] },
  },
  {
    path: 'autorizacion',
    loadChildren: () =>
      import('./authorization/authorization.module').then(
        (m) => m.AuthorizationModule
      ),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN] },
  },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./patients/patients.module').then((m) => m.PatientsModule),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN, ROLES.DOCTOR] },
  },
  {
    path: 'medicos',
    loadChildren: () =>
      import('./doctors/doctors.module').then((m) => m.DoctorsModule),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN] },
  },
  {
    path: 'departamentos',
    loadChildren: () =>
      import('./departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN] },
  },
  {
    path: 'salas',
    loadChildren: () =>
      import('./rooms/rooms.module').then((m) => m.RoomsModule),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN] },
  },
  {
    path: 'm/citas',
    loadChildren: () =>
      import('./appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN, ROLES.DOCTOR] },
  },
  {
    path: 'citas',
    loadChildren: () =>
      import('./appointments-patient/appointments-patient.module').then(
        (m) => m.AppointmentsPatientModule
      ),
    canActivate: [roleGuard],
    data: { roles: [ROLES.PATIENT] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
