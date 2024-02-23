import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/core/models/response/auth-response.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';

/**
 * Componente que representa la página de inicio de sesión.
 */
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [
    '../../components/authentication-page/authentication-page.component.scss',
  ],
  providers: [AuthService, TokenStorageService],
})
export class LoginPageComponent {
  /** Título de la página. */
  public title: string = 'Iniciar sesión';

  /** Subtítulo de la página. */
  public subtitle: string =
    'Inicia sesión en el sistema con tus datos de autenticación.';

  /** Formulario de inicio de sesión. */
  public loginForm: FormGroup = new FormGroup({});

  /** Indica si se ha enviado el formulario. */
  public submitted: boolean = false;

  /** Mensaje de error. */
  public errorMessage: string = '';

  /** Indica si se debe mostrar la contraseña. */
  public showPassword: boolean = false;

  constructor(
    private _authService: AuthService,
    private _tokenStorageService: TokenStorageService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /** Obtiene el formulario */
  get form() {
    return this.loginForm;
  }

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * @public
   * @returns {void}
   */
  public onSubmit(): void {
    this.submitted = true;

    // Detiene el proceso si el formulario es inválido.
    if (this.form.invalid) {
      return;
    }

    const user: { username: string; password: string } = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this._authService.login(user).subscribe({
      next: (response: AuthResponse) => {
        this.errorMessage = '';
        this._tokenStorageService.saveSingIn(response);
        this._router.navigate(['/']);
      },
      error: (e) => {
        this.errorMessage = e.message;
        console.error(e.message);
      },
    });
  }
}
