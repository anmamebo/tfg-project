import { Pipe, PipeTransform } from '@angular/core';

import { TYPE_APPOINTMENT_OPTIONS } from 'src/app/core/constants/options/type-appointment-options.constants';

@Pipe({
  name: 'typeAppointment',
})
export class TypeAppointmentPipe implements PipeTransform {
  transform(type: string | null | undefined): string {
    const typeOption = TYPE_APPOINTMENT_OPTIONS.find(
      (option) => option.value === type
    );

    return typeOption ? typeOption.text : 'Otro';
  }
}
