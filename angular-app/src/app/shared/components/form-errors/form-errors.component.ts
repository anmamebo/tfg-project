import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * Componente que representa los errores de un formulario
 */
@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
})
export class FormErrorsComponent {
  /** Control del formulario */
  @Input() public control: AbstractControl | null = null;

  /** Indica si el formulario ha sido enviado */
  @Input() public submitted: boolean = false;

  /** Mapeo de errores a mensajes */
  private errorMessages: { [key: string]: () => string } = {
    required: () => 'Campo obligatorio.',
    minlength: () =>
      `Mín. ${this.control?.errors?.['minlength']?.requiredLength} caracteres, actual ${this.control?.errors?.['minlength']?.actualLength}.`,
    maxlength: () =>
      `Máx. ${this.control?.errors?.['maxlength']?.requiredLength} caracteres, actual ${this.control?.errors?.['maxlength']?.actualLength}.`,
    max: () => `Valor máximo ${this.control?.errors?.['max']?.max}.`,
    min: () => `Valor mínimo ${this.control?.errors?.['min']?.min}.`,
    email: () => 'Email inválido.',
    pattern: () => 'El campo no cumple con el formato requerido.',
    matching: () => 'Las contraseñas no coinciden.',
    passwordsDontMatch: () => 'Las contraseñas no coinciden.',
    passwordsMatch: () => 'Las contraseñas coinciden.',
    invalidFileExtension: () => 'Extensión de archivo inválida.',
    invalidFileSize: () =>
      `Tamaño de archivo inválido (máx. ${this.control?.errors?.['invalidFileSize']?.maxSize}MB).`,
    invalidPasswordFormat: () =>
      'La contraseña debe contener al menos una letra y un número.',
    invalidPasswordLength: () =>
      'La contraseña debe tener al menos 8 caracteres.',
  };

  /**
   * Devuelve un array de mensajes de error asociados al control actual.
   * @public
   * @returns {string[]} Array de mensajes de error.
   */
  public getErrorMessages(): string[] {
    const errors: string[] = [];

    if (this.control && this.control.errors) {
      Object.keys(this.control.errors).forEach((error: string) => {
        const errorMessageFn = this.errorMessages[error];
        if (errorMessageFn) {
          errors.push(errorMessageFn());
        } else {
          errors.push(error);
        }
      });
    }

    return errors;
  }
}
