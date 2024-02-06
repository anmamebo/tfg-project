import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { patientResolver } from 'src/app/core/resolvers/patient.resolver';
import { PatientsCreatePageComponent } from './pages/patients-create-page/patients-create-page.component';
import { PatientsEditPageComponent } from './pages/patients-edit-page/patients-edit-page.component';
import { PatientsMedicalHistoryPageComponent } from './pages/patients-medical-history-page/patients-medical-history-page.component';
import { PatientsMedicalTestsPageComponent } from './pages/patients-medical-tests-page/patients-medical-tests-page.component';
import { PatientsPageComponent } from './pages/patients-page/patients-page.component';
import { PatientsTreatmentsPageComponent } from './pages/patients-treatments-page/patients-treatments-page.component';
import { PatientsViewPageComponent } from './pages/patients-view-page/patients-view-page.component';

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
      data: patientResolver, // Resolver para obtener los datos del paciente
    },
  },
  {
    path: 'editar/:id',
    component: PatientsEditPageComponent,
    title: 'Editar paciente | HospitalSys',
    resolve: {
      data: patientResolver, // Resolver para obtener los datos del paciente
    },
  },
  {
    path: 'historial-medico/:id',
    component: PatientsMedicalHistoryPageComponent,
    title: 'Historial médico | HospitalSys',
    resolve: {
      data: patientResolver, // Resolver para obtener los datos del paciente
    },
  },
  {
    path: 'tratamientos/:id',
    component: PatientsTreatmentsPageComponent,
    title: 'Tratamientos | HospitalSys',
    resolve: {
      data: patientResolver, // Resolver para obtener los datos del paciente
    },
  },
  {
    path: 'pruebas-medicas/:id',
    component: PatientsMedicalTestsPageComponent,
    title: 'Pruebas médicas | HospitalSys',
    resolve: {
      data: patientResolver, // Resolver para obtener los datos del paciente
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
