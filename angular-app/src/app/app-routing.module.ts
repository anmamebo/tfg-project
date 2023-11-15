import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorModule } from 'src/app/modules/error/error.module';
import { Error404PageComponent } from 'src/app/modules/error/pages/error404-page/error404-page.component';

import { loginGuard } from "src/app/core/guards/login.guard";
import { authGuard } from 'src/app/core/guards/auth.guard';
import { roleGuard } from 'src/app/core/guards/role.guard';
import { ROLES } from "src/app/core/constants/roles.constants";

import { ModulesComponent } from './modules/modules.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule),
    canActivate: [loginGuard],
  },
  {
    path: '',
    component: ModulesComponent,
    loadChildren: () =>
      import('./modules/modules.module').then((m) => m.ModulesModule),
    canActivate: [authGuard, roleGuard],
    data: { roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.PATIENT] },
  },
  { 
    path: '**', 
    component: Error404PageComponent,
    title: 'Página no encontrada | HospitalSys'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ErrorModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
