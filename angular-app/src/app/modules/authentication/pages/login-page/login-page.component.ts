import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

// Servicios
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

// Modelos
import { User } from 'src/app/core/models/user.model';

/**
 * Componente que representa la página de inicio de sesión.
 */
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [AuthService, TokenStorageService],
})
export class LoginPageComponent implements OnInit {
  /**
   * Objeto `User` para almacenar las credenciales de inicio de sesión.
   */
  public user: User = new User('', '', '', '');

  /**
   * Formulario de inicio de sesión.
   */
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  /**
   * Indica si se ha enviado el formulario.
   */
  public submitted: Boolean = false;

  /**
   * Mensaje de error.
   */
  public errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Obtiene los controles del formulario.
   * @returns Los controles del formulario.
   */
  get form() {
    return this.loginForm.controls;
  }

  /**
   * Maneja la acción de envío del formulario de inicio de sesión.
   */
  public onSubmit() {
    this.submitted = true;

    // Detiene el proceso si el formulario es inválido.
    if (this.loginForm.invalid) {
      return;
    }

    this.user.username = this.loginForm['value'].username;
    this.user.password = this.loginForm['value'].password;

    this.authService.login(this.user).subscribe({
      next: (data) => {
        this.errorMessage = '';
        this.tokenStorageService.saveSingIn(data);
        console.log(data);
        // TODO: no se hace así
        this.router.navigate(['/']);
      },
      error: (e) => {
        this.errorMessage = e.message;
        console.error(e.message);
      },
    });
  }
}
