import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MedicalSpecialtiesPageComponent } from './pages/medical-specialties-page/medical-specialties-page.component';
import { MedicalSpecialtiesViewPageComponent } from './pages/medical-specialties-view-page/medical-specialties-view-page.component';
import { MedicalSpecialtiesEditPageComponent } from './pages/medical-specialties-edit-page/medical-specialties-edit-page.component';
import { MedicalSpecialtiesCreatePageComponent } from './pages/medical-specialties-create-page/medical-specialties-create-page.component';

import { medicalSpecialtyResolver } from 'src/app/core/resolvers/medical-specialty.resolver';

const routes: Routes = [
  {
    path: '',
    component: MedicalSpecialtiesPageComponent,
    title: 'Especialidades médicas | HospitalSys',
  },
  {
    path: 'crear',
    component: MedicalSpecialtiesCreatePageComponent,
    title: 'Crear especialidad médica | HospitalSys',
  },
  {
    path: ':id',
    component: MedicalSpecialtiesViewPageComponent,
    title: 'Ver especialidad médica | HospitalSys',
    resolve: {
      data: medicalSpecialtyResolver, // Resolver para obtener los datos de la especialidad médica
    },
  },
  {
    path: 'editar/:id',
    component: MedicalSpecialtiesEditPageComponent,
    title: 'Editar especialidad médica | HospitalSys',
    resolve: {
      data: medicalSpecialtyResolver, // Resolver para obtener los datos de la especialidad médica
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalSpecialtiesRoutingModule {}
