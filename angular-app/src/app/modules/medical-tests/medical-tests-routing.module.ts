import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MedicalTestsViewPageComponent } from './page/medical-tests-view-page/medical-tests-view-page.component';

import { medicalTestResolver } from 'src/app/core/resolvers/medical-test.resolver';

const routes: Routes = [
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
