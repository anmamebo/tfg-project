import { Pipe, PipeTransform } from '@angular/core';

import { STATUS_APPOINTMENT_OPTIONS } from 'src/app/core/constants/options/status-appointment-options.constants';

@Pipe({
  name: 'statusAppointment',
})
export class StatusAppointmentPipe implements PipeTransform {
  transform(status: string | null | undefined): string {
    const statusOption = STATUS_APPOINTMENT_OPTIONS.find(
      (option) => option.value === status
    );

    return statusOption ? statusOption.text : 'Otro';
  }
}
