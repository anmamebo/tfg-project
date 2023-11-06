import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import Validation from 'src/app/core/validators/general.validator';

/**
 * Componente que representa un formulario para cambiar la contraseña del usuario.
 */
@Component({
  selector: 'app-change-password-card',
  templateUrl: './change-password-card.component.html',
  styleUrls: ['./change-password-card.component.scss'],
})
export class ChangePasswordCardComponent implements OnInit {
  /**
   * Formulario para cambiar la contraseña, con campos para la contraseña actual, nueva contraseña y confirmación de la nueva contraseña.
   */
  public changePasswordForm: FormGroup = new FormGroup({
    current_password: new FormControl(''),
    new_password: new FormControl(''),
    confirm_new_password: new FormControl(''),
  });

  /**
   * Indica si se ha enviado el formulario.
   */
  public submitted: Boolean = false;

  /**
   * Mensaje de error.
   */
  public errorMessage: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        current_password: ['', Validators.required],
        new_password: ['', Validators.required],
        confirm_new_password: ['', Validators.required],
      },
      {
        validators: [Validation.match('new_password', 'confirm_new_password')],
      }
    );
  }

  /**
   * Obtiene los controles del formulario.
   * @returns Los controles del formulario.
   */
  get form() {
    return this.changePasswordForm.controls;
  }

  /**
   * Maneja la acción de envío del formulario de cambio de contraseña.
   */
  onSubmit() {
    this.submitted = true;

    // Detiene el proceso si el formulario es inválido.
    if (this.changePasswordForm.invalid) {
      return;
    }
  }
}
