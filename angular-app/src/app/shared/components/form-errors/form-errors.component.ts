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

  /**
   * Devuelve un array de mensajes de error asociados al control actual.
   * @public
   * @returns {string[]} Array de mensajes de error.
   */
  public getErrorMessages(): string[] {
    const errors: string[] = [];

    if (this.control && this.control.errors) {
      Object.keys(this.control.errors).forEach((error: string) => {
        switch (error) {
          case 'required':
            errors.push('Campo obligatorio.');
            break;
          case 'minlength':
            errors.push(
              `Mín. ${this.control?.errors?.['minlength']?.requiredLength} caracteres, actual ${this.control?.errors?.['minlength']?.actualLength}.`
            );
            break;
          case 'maxlength':
            errors.push(
              `Máx. ${this.control?.errors?.['maxlength']?.requiredLength} caracteres, actual ${this.control?.errors?.['maxlength']?.actualLength}.`
            );
            break;
          case 'max':
            errors.push(`Valor máximo ${this.control?.errors?.['max']?.max}.`);
            break;
          case 'min':
            errors.push(`Valor mínimo ${this.control?.errors?.['min']?.min}.`);
            break;
          case 'email':
            errors.push('Email inválido.');
            break;
          case 'pattern':
            errors.push('El campo no cumple con el formato requerido.');
            break;
          case 'matching':
            errors.push('Las contraseñas no coinciden.');
            break;
          case 'passwordsDontMatch':
            errors.push('Las contraseñas no coinciden.');
            break;
          case 'passwordsMatch':
            errors.push('Las contraseñas coinciden.');
            break;
          case 'invalidFileExtension':
            errors.push('Extensión de archivo inválida.');
            break;
          default:
            errors.push(error);
            break;
        }
      });
    }

    return errors;
  }
}
