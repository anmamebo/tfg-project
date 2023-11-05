import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorModule } from 'src/app/modules/error/error.module';
import { Error404PageComponent } from 'src/app/modules/error/pages/error404-page/error404-page.component';

import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { ModulesComponent } from './modules/modules.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: ModulesComponent,
    loadChildren: () =>
      import('./modules/modules.module').then((m) => m.ModulesModule),
    canActivate: [AuthGuard],
  },
  { path: '**', component: Error404PageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ErrorModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
