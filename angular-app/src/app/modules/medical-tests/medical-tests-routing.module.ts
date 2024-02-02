import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MedicalTestsViewPageComponent } from './pages/medical-tests-view-page/medical-tests-view-page.component';
import { MedicalTestsPageComponent } from './pages/medical-tests-page/medical-tests-page.component';

import { medicalTestResolver } from 'src/app/core/resolvers/medical-test.resolver';

const routes: Routes = [
  {
    path: '',
    component: MedicalTestsPageComponent,
    title: 'Pruebas médicas | HospitalSys',
  },
  {
    path: ':id',
    component: MedicalTestsViewPageComponent,
    title: 'Prueba médica | HospitalSys',
    resolve: {
      data: medicalTestResolver, // Resolver para obtener los datos de la prueba médica
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalTestsRoutingModule {}
