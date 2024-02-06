import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { doctorResolver } from 'src/app/core/resolvers/doctor.resolver';
import { DoctorsCreatePageComponent } from './pages/doctors-create-page/doctors-create-page.component';
import { DoctorsEditPageComponent } from './pages/doctors-edit-page/doctors-edit-page.component';
import { DoctorsPageComponent } from './pages/doctors-page/doctors-page.component';
import { DoctorsViewPageComponent } from './pages/doctors-view-page/doctors-view-page.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorsPageComponent,
    title: 'Médicos | HospitalSys',
  },
  {
    path: 'crear',
    component: DoctorsCreatePageComponent,
    title: 'Crear médico | HospitalSys',
  },
  {
    path: ':id',
    component: DoctorsViewPageComponent,
    title: 'Ver médico | HospitalSys',
    resolve: {
      data: doctorResolver, // Resolver para obtener los datos del médico
    },
  },
  {
    path: 'editar/:id',
    component: DoctorsEditPageComponent,
    title: 'Editar médico | HospitalSys',
    resolve: {
      data: doctorResolver, // Resolver para obtener los datos del médico
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
