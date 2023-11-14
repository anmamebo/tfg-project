import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { AuthenticationRoutingModule } from './authentication-routing.module';

// Componentes
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule, 
    AuthenticationRoutingModule, 
    ReactiveFormsModule
  ],
})
export class AuthenticationModule {}
