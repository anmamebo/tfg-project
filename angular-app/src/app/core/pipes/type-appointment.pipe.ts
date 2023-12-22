import { Pipe, PipeTransform } from '@angular/core';

import { TYPE_APPOINTMENT_OPTIONS } from 'src/app/core/constants/options/type-appointment-options.constants';

/**
 * Transforma el tipo de una cita médica en su representación correspondiente.
 */
@Pipe({
  name: 'typeAppointment',
})
export class TypeAppointmentPipe implements PipeTransform {
  /**
   * Transforma el tipo de una cita médica en su representación de texto.
   * @param {string | null | undefined} type - Tipo de la cita médica a transformar.
   * @returns {string} - Representación de texto del tipo de cita médica.
   */
  transform(type: string | null | undefined): string {
    // Busca la opción de tipo correspondiente en TYPE_APPOINTMENT_OPTIONS
    const typeOption = TYPE_APPOINTMENT_OPTIONS.find(
      (option) => option.value === type
    );

    // Devuelve el texto del tipo de la cita médica si se encuentra una opción válida; de lo contrario, devuelve 'Otro'.
    return typeOption ? typeOption.text : 'Otro';
  }
}
