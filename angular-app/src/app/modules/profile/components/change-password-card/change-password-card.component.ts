import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { UserService } from 'src/app/core/services/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Validadores
import Validation from 'src/app/core/validators/general.validator';

/**
 * Componente que representa un formulario para cambiar la contraseña del usuario.
 */
@Component({
  selector: 'app-change-password-card',
  templateUrl: './change-password-card.component.html',
  styleUrls: ['./change-password-card.component.scss'],
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
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
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

  /** Obtiene el formulario */
  get form() {
    return this.changePasswordForm;
  }

  /**
   * Maneja la acción de envío del formulario de cambio de contraseña.
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

    this.userService.updatePassword(data).subscribe({
      next: (data) => {
        this.submitted = false;
        this.form.reset();
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this.submitted = false;
        this.notificationService.showErrorToast(error.message);
      },
    });
  }
}
