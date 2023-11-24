import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomsPageComponent } from './pages/rooms-page/rooms-page.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsPageComponent,
    title: 'Salas | HospitalSys',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
