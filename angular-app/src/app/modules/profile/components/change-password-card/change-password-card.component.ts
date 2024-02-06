import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';

// Servicios
import { UserService } from 'src/app/core/services/entities/user.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Validadores
import Validation from 'src/app/core/validators/general.validator';

/**
 * Componente que representa un formulario para cambiar la contraseña del usuario.
 */
@Component({
  selector: 'app-change-password-card',
  templateUrl: './change-password-card.component.html',
  providers: [UserService, NotificationService],
})
export class ChangePasswordCardComponent {
  /** Título de la tarjeta. */
  public titleCard: string = 'Cambiar contraseña';

  /** Formulario para cambiar la contraseña, con campos para la contraseña actual, nueva contraseña y confirmación de la nueva contraseña. */
  public changePasswordForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario. */
  public submitted: boolean = false;

  /** Mensaje de error. */
  public errorMessage: string = '';

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _notificationService: NotificationService
  ) {
    this.changePasswordForm = this._fb.group(
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

  /** Obtiene el formulario */
  get form() {
    return this.changePasswordForm;
  }

  /**
   * Gestiona el envío del formulario para actualizar la contraseña del usuario.
   * Realiza una solicitud para actualizar la contraseña del usuario actual con los datos proporcionados en el formulario.
   * Muestra una notificación de éxito o error según el resultado.
   * @returns {void}
   * @public
   */
  public onSubmit(): void {
    this.submitted = true;

    // Detiene el proceso si el formulario es inválido.
    if (this.form.invalid) {
      return;
    }

    const data: { old_password: string; password: string; password2: string } =
      {
        old_password: this.form.value.current_password,
        password: this.form.value.new_password,
        password2: this.form.value.confirm_new_password,
      };

    this._userService.updatePassword(data).subscribe({
      next: (response: MessageResponse) => {
        this.submitted = false;
        this.form.reset();
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error) => {
        this.submitted = false;
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
