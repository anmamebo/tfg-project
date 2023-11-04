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
import { AuthResponse } from '../models/auth-response';

// Configuración de encabezados HTTP
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url: string;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.url = API_URL.url;
  }

  public login(user: User): Observable<AuthResponse> {
    let params = JSON.stringify(user);

    console.log('params: ' + params);

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
            'Ocurrió un error en el servidor. Intentalo más tarde.'
          );
        })
      );
  }

  public isLogin(): boolean {
    if (this.tokenStorageService.getToken()) {
      return true;
    } else {
      return false;
    }
  }

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
          'Ocurrió un error en el servidor. Intentalo más tarde.'
        );
      })
    );
  }
}
