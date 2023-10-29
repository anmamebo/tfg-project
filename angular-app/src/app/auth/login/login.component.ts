import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

// Servicios
import { AuthService } from '../../core/services/auth.service';
import { TokenStorageService } from '../../core/services/token-storage.service';

// Modelos
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, TokenStorageService],
})
export class LoginComponent implements OnInit {
  user: User = new User('', '', '', '');
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted: Boolean = false;
  errorMessage: string = '';

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Iniciar sesión | HospitalSys');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Stop here is form is invalid
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
        this.router.navigate(['/logout']);
      },
      error: (e) => {
        this.errorMessage = e.message;
        console.error(e.message);
      },
    });
  }
}
