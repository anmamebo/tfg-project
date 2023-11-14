import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
export class ChangePasswordCardComponent implements OnInit {
  /** Título de la tarjeta. */
  public titleCard: string = 'Cambiar contraseña';

  /** Formulario para cambiar la contraseña, con campos para la contraseña actual, nueva contraseña y confirmación de la nueva contraseña. */
  public changePasswordForm: FormGroup = new FormGroup({
    current_password: new FormControl(''),
    new_password: new FormControl(''),
    confirm_new_password: new FormControl(''),
  });

  /** Indica si se ha enviado el formulario. */
  public submitted: Boolean = false;

  /** Mensaje de error. */
  public errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // TODO: Añadir validación longitud mínima de contraseña.
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
  public onSubmit(): void {
    this.submitted = true;

    // Detiene el proceso si el formulario es inválido.
    if (this.changePasswordForm.invalid) {
      return;
    }

    const data: {old_password: string, password: string, password2: string} = {
      old_password: this.changePasswordForm.value.current_password,
      password: this.changePasswordForm.value.new_password,
      password2: this.changePasswordForm.value.confirm_new_password,
    };

    this.userService.updatePassword(data).subscribe({
      next: (data) => {
        this.submitted = false;
        this.changePasswordForm.reset();
        this.notificationService.showSuccessToast(data.message);
      },
      error: (error) => {
        this.submitted = false;
        this.notificationService.showErrorToast(error.message);
      },
    });
  }
}
