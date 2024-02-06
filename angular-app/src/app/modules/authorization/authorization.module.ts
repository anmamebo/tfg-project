import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { AuthorizationRoutingModule } from './authorization-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, AuthorizationRoutingModule],
})
export class AuthorizationModule {}
