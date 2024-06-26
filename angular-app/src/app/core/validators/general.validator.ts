import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Clase de utilidad para validaciones personalizadas en formularios.
 */
export default class Validation {
  /**
   * Comprueba si dos campos en un formulario coinciden entre sí.
   * @param controlName El nombre del control principal.
   * @param checkControlName El nombre del control a verificar.
   * @returns Una función de validación para comprobar la coincidencia de los campos.
   */
  static match(controlName: string, checkControlName: string): ValidatorFn {
    /**
     * Función de validación que comprueba la coincidencia de los valores de los controles.
     * @param control El control al que se aplica la validación.
     * @returns Un objeto de errores si los valores no coinciden; de lo contrario, null.
     */
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  /**
   * Comprueba si un campo en un formulario tiene una extensión de fichero permitida.
   * @param allowedExtensions Las extensiones de fichero permitidas.
   * @returns Una función de validación para comprobar la extensión del fichero.
   */
  static fileExtension(allowedExtensions: string[]): ValidatorFn {
    /**
     * Función de validación que comprueba la extensión del fichero.
     * @param control El control al que se aplica la validación.
     * @returns Un objeto de errores si la extensión no es válida; de lo contrario, null.
     */
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;

      if (file) {
        const fileName = file.name;
        const fileNameParts = fileName.split('.');
        const fileExtension =
          fileNameParts.length > 1 ? fileNameParts.pop()?.toLowerCase() : null;

        if (fileExtension && allowedExtensions.indexOf(fileExtension) === -1) {
          return { invalidFileExtension: true };
        }
      }

      return null;
    };
  }

  /**
   * Comprueba si un campo en un formulario tiene un tamaño de fichero válido.
   * @param maxSizeMB El tamaño máximo del fichero.
   * @returns Una función de validación para comprobar el tamaño del fichero.
   */
  static fileSizeInMB(maxSizeMB: number): ValidatorFn {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    /**
     * Función de validación que comprueba el tamaño del fichero.
     * @param control El control al que se aplica la validación.
     * @returns Un objeto de errores si el tamaño no es válido; de lo contrario, null.
     */
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value as File;

      if (file) {
        const fileSize = file.size;

        if (fileSize > maxSizeBytes) {
          return { invalidFileSize: { maxSize: maxSizeMB } };
        }
      }

      return null;
    };
  }

  /**
   * Comprueba si un campo en un formulario tiene un formato de contraseña válido.
   * @returns Una función de validación para comprobar el formato de la contraseña.
   */
  static passwordFormat(): ValidatorFn {
    /**
     * Función de validación que comprueba el formato de la contraseña.
     * @param control El control al que se aplica la validación.
     * @returns Un objeto de errores si el formato no es válido; de lo contrario, null.
     */
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;

      if (password) {
        const containsNumber = /\d/.test(password);
        const containsLetter = /[a-zA-Z]/.test(password);

        if (!containsNumber || !containsLetter) {
          return {
            invalidPasswordFormat: true,
          };
        }

        if (password.length < 8) {
          return {
            invalidPasswordLength: true,
          };
        }
      }

      return null;
    };
  }
}
