import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from "./auth-routing.module";

import { LoginComponent } from './login/login.component';
import { SignoutComponent } from './signout/signout.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    LoginComponent,
    SignoutComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
