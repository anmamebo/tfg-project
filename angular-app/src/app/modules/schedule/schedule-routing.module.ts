import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulePageComponent,
    title: 'Mi Horario | HospitalSys',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
