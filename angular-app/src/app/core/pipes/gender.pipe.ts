import { Pipe, PipeTransform } from '@angular/core';
import { GENDER_OPTIONS } from '@app/core/constants/options/genders-options.constants';

/**
 * Transforma el valor de género en su representación correspondiente.
 */
@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  /**
   * Transforma el valor de género en su representación de texto.
   * @param {string | null | undefined} gender - Valor de género a transformar.
   * @returns {string} - Representación de texto del género.
   */
  transform(gender: string | null | undefined): string {
    // Busca la opción de género correspondiente en GENDER_OPTIONS
    const genderOption = GENDER_OPTIONS.find(
      (option) => option.value === gender
    );

    // Devuelve el texto del género si se encuentra una opción válida; de lo contrario, devuelve 'Otro'.
    return genderOption ? genderOption.text : 'Otro';
  }
}
