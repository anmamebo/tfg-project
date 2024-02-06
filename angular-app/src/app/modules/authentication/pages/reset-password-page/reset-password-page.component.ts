import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Validation from 'src/app/core/validators/general.validator';

/**
 * Componente que representa la página de restablecimiento de contraseña.
 */
@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
  providers: [AuthService],
})
export class ResetPasswordPageComponent implements OnInit {
  /** Identificador del usuario. */
  public userId: string | null = null;

  /** Token de restablecimiento de contraseña. */
  public token: string | null = null;

  /** Formulario de restablecimiento de contraseña. */
  public resetPasswordForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario. */
  public submitted: boolean = false;

  /** Mensaje de error. */
  public errorMessage: string = '';

  /** Indica si se debe mostrar la contraseña. */
  public showPassword: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _fb: FormBuilder
  ) {
    this.resetPasswordForm = this._fb.group(
      {
        password: ['', Validators.required],
        confirm_password: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirm_password')],
      }
    );
  }

  ngOnInit(): void {
    this.userId = this._route.snapshot.paramMap.get('uid');
    this.token = this._route.snapshot.paramMap.get('token');
  }

  /** Obtiene el formulario */
  get form() {
    return this.resetPasswordForm;
  }

  /**
   * Maneja el envío del formulario de restablecimiento de contraseña.
   * @public
   * @returns {void}
   */
  public onSubmit(): void {
    this.submitted = true;

    if (!this.token || !this.userId) {
      return;
    }

    // Detiene el proceso si el formulario es inválido.
    if (this.form.invalid) {
      return;
    }

    const data: { password: string; token: string; id: string } = {
      password: this.form.value.password,
      token: this.token,
      id: this.userId,
    };

    this._authService.resetPassword(data).subscribe({
      next: (response: MessageResponse) => {
        this.errorMessage = '';
        this._router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error(error.message);
      },
    });
  }
}
