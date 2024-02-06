import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Iniciar sesión | HospitalSys',
  },
  {
    path: 'olvide-contrasena',
    component: ForgotPasswordPageComponent,
    title: 'Olvidé mi contraseña | HospitalSys',
  },
  {
    path: 'restablecer-contrasena/:uid/:token',
    component: ResetPasswordPageComponent,
    title: 'Restablecer contraseña | HospitalSys',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
