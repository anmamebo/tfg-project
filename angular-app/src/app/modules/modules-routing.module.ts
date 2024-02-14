import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROLES } from 'src/app/core/constants/roles.constants';
import { roleGuard } from 'src/app/core/guards/role.guard';

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
    path: 'administrativos',
    loadChildren: () =>
      import('./administratives/administratives.module').then(
        (m) => m.AdministrativesModule
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
    path: 'especialidades-medicas',
    loadChildren: () =>
      import('./medical-specialties/medical-specialties.module').then(
        (m) => m.MedicalSpecialtiesModule
      ),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN, ROLES.DOCTOR] },
  },
  {
    path: 'departamentos',
    loadChildren: () =>
      import('./departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN, ROLES.DOCTOR] },
  },
  {
    path: 'salas',
    loadChildren: () =>
      import('./rooms/rooms.module').then((m) => m.RoomsModule),
    canActivate: [roleGuard],
    data: { roles: [ROLES.ADMIN, ROLES.DOCTOR] },
  },
  {
    path: 'solicitar-cita',
    loadChildren: () =>
      import('./appointment-request/appointment-request.module').then(
        (m) => m.AppointmentRequestModule
      ),
    canActivate: [roleGuard],
    data: { roles: [ROLES.PATIENT] },
  },
  {
    path: 'm/citas',
    loadChildren: () =>
      import('./appointments-doctor/appointments-doctor.module').then(
        (m) => m.AppointmentsDoctorModule
      ),
    canActivate: [roleGuard],
    data: { roles: [ROLES.DOCTOR] },
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
  {
    path: 'tratamientos',
    loadChildren: () =>
      import('./treatments-patient/treatments-patient.module').then(
        (m) => m.TreatmentsPatientModule
      ),
    canActivate: [roleGuard],
    data: { roles: [ROLES.PATIENT] },
  },
  {
    path: 'pruebas-medicas',
    loadChildren: () =>
      import('./medical-tests/medical-tests.module').then(
        (m) => m.MedicalTestsModule
      ),
    canActivate: [roleGuard],
    data: { roles: [ROLES.DOCTOR, ROLES.PATIENT] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
