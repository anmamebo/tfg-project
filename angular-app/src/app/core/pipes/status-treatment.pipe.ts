import { Pipe, PipeTransform } from '@angular/core';
import { STATUS_TREATMENT_OPTIONS } from 'src/app/core/constants/options/status-treatment-options.constants';

/**
 * Transforma el estado de un tratamiento en su representación correspondiente.
 */
@Pipe({
  name: 'statusTreatment',
})
export class StatusTreatmentPipe implements PipeTransform {
  /**
   * Transforma el estado de un tratamiento en su representación de texto.
   * @param {string | null | undefined} status - Estado del tratamiento a transformar.
   * @returns {string} - Representación de texto del estado del tratamiento.
   */
  transform(status: string | null | undefined): string {
    // Busca la opción de estado correspondiente en STATUS_TREATMENT_OPTIONS
    const statusOption = STATUS_TREATMENT_OPTIONS.find(
      (option) => option.value === status
    );

    // Devuelve el texto del estado del tratamiento si se encuentra una opción válida; de lo contrario, devuelve 'Otro'.
    return statusOption ? statusOption.text : 'Otro';
  }
}
