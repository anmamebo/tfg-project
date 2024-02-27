import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Directives
import { HasRoleDirective } from '@app/core/directives/has-role.directive';

// Pipes
import { GenderPipe } from '@app/core/pipes/gender.pipe';
import { StatusAppointmentPipe } from '@app/core/pipes/status-appointment.pipe';
import { StatusTreatmentPipe } from '@app/core/pipes/status-treatment.pipe';
import { TypeAppointmentPipe } from '@app/core/pipes/type-appointment.pipe';

@NgModule({
  declarations: [
    HasRoleDirective,
    GenderPipe,
    TypeAppointmentPipe,
    StatusAppointmentPipe,
    StatusTreatmentPipe,
  ],
  imports: [CommonModule],
  exports: [
    HasRoleDirective,
    GenderPipe,
    TypeAppointmentPipe,
    StatusAppointmentPipe,
    StatusTreatmentPipe,
  ],
})
export class SharedModule {}
