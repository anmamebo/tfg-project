import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Directives
import { HasRoleDirective } from "src/app/core/directives/has-role.directive";

// Pipes
import { GenderPipe } from 'src/app/core/pipes/gender.pipe';
import { TypeAppointmentPipe } from 'src/app/core/pipes/type-appointment.pipe';
import { StatusAppointmentPipe } from "src/app/core/pipes/status-appointment.pipe";
import { StatusTreatmentPipe } from "src/app/core/pipes/status-treatment.pipe";


@NgModule({
  declarations: [
    HasRoleDirective,
    GenderPipe,
    TypeAppointmentPipe,
    StatusAppointmentPipe,
    StatusTreatmentPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HasRoleDirective, 
    GenderPipe,
    TypeAppointmentPipe,
    StatusAppointmentPipe,
    StatusTreatmentPipe,
  ]
})
export class SharedModule { }
