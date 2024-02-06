import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { FormErrorsModule } from 'src/app/shared/components/form-errors/form-errors.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';

// Componentes
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormErrorsModule,
  ],
})
export class AuthenticationModule {}
