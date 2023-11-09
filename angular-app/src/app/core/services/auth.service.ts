import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

import { TokenStorageService } from './token-storage.service';

import { API_URL } from '../constants/API_URL';

import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';

// Configuración de encabezados HTTP
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

/**
 * Servicio para la gestión de la autenticación y la interacción con la API de autenticación.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * URL base de la API de autenticación.
   */
  public url: string;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.url = API_URL.url;
  }

  /**
   * Inicia sesión con las credenciales de usuario proporcionadas.
   * @param user El objeto `User` con las credenciales de inicio de sesión.
   * @returns Un observable que emite un objeto `AuthResponse`.
   */
  public login(user: User): Observable<AuthResponse> {
    let params = JSON.stringify(user);

    return this.http
      .post<AuthResponse>(this.url + 'login/', params, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            let errorMessage =
              error.error.message ||
              'Contraseña o nombre de usuario incorrectos';
            throw new Error(errorMessage);
          }
          throw new Error(
            'Ocurrió un error en el servidor. Inténtalo más tarde.'
          );
        })
      );
  }

  /**
   * Verifica si el usuario ha iniciado sesión.
   * @returns `true` si el usuario ha iniciado sesión, de lo contrario `false`.
   */
  public isLogin(): boolean {
    if (this.tokenStorageService.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Cierra la sesión del usuario actual.
   * @returns Un observable que emite un objeto `any`.
   */
  public logOut(): Observable<any> {
    let user = this.tokenStorageService.signOut();
    let user_id = { user: user.user.id };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
    });
    const httpOptions = { headers };

    return this.http.post<any>(this.url + 'logout/', user_id, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          let errorMessage =
            error.error.message || 'Ocurrió un error al cerrar sesión';
          throw new Error(errorMessage);
        }
        throw new Error(
          'Ocurrió un error en el servidor. Inténtalo más tarde.'
        );
      })
    );
  }
}
