import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormErrorsModule } from 'src/app/shared/components/form-errors/form-errors.module';

// Componentes
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';

@NgModule({
  declarations: [LoginPageComponent, ForgotPasswordPageComponent, ResetPasswordPageComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormErrorsModule,
  ],
})
export class AuthenticationModule {}
