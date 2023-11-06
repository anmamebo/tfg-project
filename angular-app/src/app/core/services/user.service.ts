import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { TokenStorageService } from './token-storage.service';

import { API_URL } from '../constants/API_URL';

import { User } from '../models/user.model';

/**
 * Servicio para interactuar con la API para la gestión de usuarios.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * URL base de la API para la gestión de usuarios.
   */
  public url: string;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.url = API_URL.url;
  }

  /**
   * Obtiene un usuario por su identificador.
   * @param id El identificador del usuario.
   * @returns Un observable que emite un objeto `User`.
   */
  public getUserById(id: number): Observable<User> {
    let token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    const httpOptions = { headers };

    return this.http.get<User>(this.url + 'users/' + id + '/', httpOptions);
  }

  /**
   * Actualiza los datos de un usuario.
   * @param user El objeto `User` con los datos actualizados.
   * @returns Un observable que emite un objeto `any`.
   */
  public updateUser(user: User): Observable<any> {
    let token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    const httpOptions = { headers };

    let params = JSON.stringify(user);

    return this.http
      .put<any>(this.url + 'users/' + user.id + '/', params, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            let errorMessage =
              error.error.message || 'Hay errores en la actualización';
            throw new Error(errorMessage);
          }
          throw new Error(
            'Ocurrió un error en el servidor. Intentalo más tarde.'
          );
        })
      );
  }

  /**
   * Actualiza la contraseña del usuario.
   * @param data - Los datos necesarios para actualizar la contraseña, como la nueva contraseña.
   * @returns Un Observable que se suscribe a la solicitud HTTP para actualizar la contraseña.
   */
  public updatePassword(data: any): Observable<any> {
    // Obtiene el token de autenticación del usuario
    let token = this.tokenStorageService.getToken();

    // Obtiene la información del usuario actual, como su ID
    let user = this.tokenStorageService.getUser();
    let user_id = user.user.id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    const httpOptions = { headers };

    let params = JSON.stringify(data);

    return this.http
      .post<any>(
        this.url + 'users/' + user_id + '/set_password/',
        params,
        httpOptions
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            let errorMessage = 'Contraseña actual incorrecta';
            throw new Error(errorMessage);
          }
          throw new Error(
            'Ocurrió un error en el servidor. Intentalo más tarde.'
          );
        })
      );
  }
}
