import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa la página de recuperación de contraseña.
 */
@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: [
    '../../components/authentication-page/authentication-page.component.scss',
  ],
  providers: [AuthService],
})
export class ForgotPasswordPageComponent {
  /** Título de la página. */
  public title: string = 'Olvidé mi contraseña';

  /** Subtítulo de la página. */
  public subtitle: string =
    'Te enviaremos un enlace para recuperar tu contraseña.';

  /** Formulario de recuperación de contraseña. */
  public forgotPasswordForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario. */
  public submitted: boolean = false;

  /** Mensaje de error. */
  public errorMessage: string = '';

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _notificationService: NotificationService
  ) {
    this.forgotPasswordForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.forgotPasswordForm;
  }

  /**
   * Maneja el envío del formulario de recuperación de contraseña.
   * @public
   * @returns {void}
   */
  public onSubmit(): void {
    this.submitted = true;

    // Detiene el proceso si el formulario es inválido.
    if (this.form.invalid) {
      return;
    }

    const email: string = this.form.value.email;

    this._authService.forgotPassword(email).subscribe({
      next: (response: MessageResponse) => {
        this.errorMessage = '';
        this._notificationService.showSuccessToast(response.message);
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error(error.message);
      },
    });
  }
}
