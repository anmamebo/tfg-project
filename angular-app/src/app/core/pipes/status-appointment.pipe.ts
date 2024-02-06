import { Pipe, PipeTransform } from '@angular/core';
import { STATUS_APPOINTMENT_OPTIONS } from 'src/app/core/constants/options/status-appointment-options.constants';

/**
 * Transforma el estado de una cita en su representación correspondiente.
 */
@Pipe({
  name: 'statusAppointment',
})
export class StatusAppointmentPipe implements PipeTransform {
  /**
   * Transforma el estado de una cita en su representación de texto.
   * @param {string | null | undefined} status - Estado de la cita a transformar.
   * @returns {string} - Representación de texto del estado de la cita.
   */
  transform(status: string | null | undefined): string {
    // Busca la opción de estado correspondiente en STATUS_APPOINTMENT_OPTIONS
    const statusOption = STATUS_APPOINTMENT_OPTIONS.find(
      (option) => option.value === status
    );

    // Devuelve el texto del estado de la cita si se encuentra una opción válida; de lo contrario, devuelve 'Otro'.
    return statusOption ? statusOption.text : 'Otro';
  }
}
