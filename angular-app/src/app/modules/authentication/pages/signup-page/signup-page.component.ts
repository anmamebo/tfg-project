import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { GENDER_OPTIONS } from 'src/app/core/constants/options/genders-options.constants';
import { DNI_REGEXP } from 'src/app/core/constants/regex.constants';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';

/**
 * Componente que representa la página de registro.
 */
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: [
    '../../components/authentication-page/authentication-page.component.scss',
  ],
  providers: [AuthService, DatePipe],
})
export class SignupPageComponent {
  /** Título de la página. */
  public title: string = 'Registro';

  /** Subtítulo de la página. */
  public subtitle: string =
    'Introduce tus datos para registrarte en el sistema.';

  /** Formulario de registro. */
  public signupForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario. */
  public submitted: boolean = false;

  /** Mensaje */
  public message: string = '';

  /** Indica si se debe mostrar la contraseña. */
  public showPassword: boolean = false;

  /** Opciones para el campo de fecha de nacimiento */
  public locale = Spanish;

  /** Opciones para el campo de género */
  public gender_options = GENDER_OPTIONS;

  /** Indica si el registro fue exitoso */
  public success: boolean = false;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _datePipe: DatePipe
  ) {
    this.signupForm = this._fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dni: [
        '',
        [
          Validators.required,
          Validators.maxLength(9),
          Validators.pattern(DNI_REGEXP),
        ],
      ],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.signupForm;
  }

  /**
   * Maneja el envío del formulario de registro.
   * @public
   * @returns {void}
   */
  public onSubmit(): void {
    this.submitted = true;

    // Detiene el proceso si el formulario es inválido.
    if (this.form.invalid) {
      return;
    }

    const user: any = {
      user: {
        name: this.form.value.name,
        last_name: this.form.value.last_name,
        email: this.form.value.email,
        password: this.form.value.password,
      },
      dni: this.form.value.dni,
      birthdate: this.form.value.birthdate
        ? this._datePipe.transform(
            new Date(this.form.value.birthdate),
            'yyyy-MM-dd'
          )
        : null,
      gender: this.form.value.gender,
    };

    this._authService.signup(user).subscribe({
      next: (response: MessageResponse) => {
        this.message = response.message;
        this.success = true;
        this._resetForm();
      },
      error: (error) => {
        this.message = error.message;
        this.success = false;
      },
    });
  }

  /**
   * Reinicia el formulario.
   * @private
   * @returns {void}
   */
  private _resetForm(): void {
    this.submitted = false;
    this.form.get('name')?.setValue('');
    this.form.get('last_name')?.setValue('');
    this.form.get('email')?.setValue('');
    this.form.get('password')?.setValue('');
    this.form.get('dni')?.setValue('');
    this.form.get('birthdate')?.setValue('');
    this.form.get('gender')?.setValue('');
  }
}
