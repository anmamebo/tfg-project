import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'horario',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.ScheduleModule),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'autorizacion',
    loadChildren: () =>
      import('./authorization/authorization.module').then((m) => m.AuthorizationModule),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
