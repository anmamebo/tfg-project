import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROLES } from '@app/core/constants/roles.constants';
import { authGuard } from '@app/core/guards/auth.guard';
import { loginGuard } from '@app/core/guards/login.guard';
import { roleGuard } from '@app/core/guards/role.guard';
import { ErrorModule } from '@app/modules/error/error.module';
import { Error404PageComponent } from '@app/modules/error/pages/error404-page/error404-page.component';
import { ModulesComponent } from './modules/modules.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
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
    title: 'Página no encontrada | HospitalSys',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ErrorModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
