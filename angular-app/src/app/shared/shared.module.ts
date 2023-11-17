import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HasRoleDirective } from "src/app/core/directives/has-role.directive";
import { GenderPipe } from 'src/app/core/pipes/gender.pipe';


@NgModule({
  declarations: [
    HasRoleDirective,
    GenderPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HasRoleDirective, 
    GenderPipe
  ]
})
export class SharedModule { }
