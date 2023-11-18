import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { API_URL } from '../constants/API_URL';

// Servicios
import { HttpCommonService } from "./http-common.service";
import { TokenStorageService } from "./token-storage.service";

// Modelos
import { User } from '../models/user.model';


/**
 * Servicio para interactuar con la API para la gestión de usuarios.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService,
    private tokenStorageService: TokenStorageService
  ) {
    this.url = API_URL.url + 'users/users/';
  }

  /**
   * Obtiene un usuario por su identificador.
   * @param id El identificador del usuario.
   * @returns Un observable que emite un objeto `User`.
   */
  public getUserById(id: number): Observable<User> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<User>(this.url + id + '/', httpOptions);
  }

  /**
   * Actualiza los datos de un usuario.
   * @param user El objeto `User` con los datos actualizados.
   * @returns Un observable que emite un objeto `any`.
   */
  public updateUser(user: User): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(user);

    return this.http.put<any>(this.url + user.id + '/', params, httpOptions);
  }

  /**
   * Actualiza la contraseña del usuario.
   * @param data - Los datos necesarios para actualizar la contraseña, como la nueva contraseña.
   * @returns Un Observable que se suscribe a la solicitud HTTP para actualizar la contraseña.
   */
  public updatePassword(data: {old_password: string, password: string, password2: string}): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    // Obtiene la información del usuario actual, como su ID
    let user = this.tokenStorageService.getUser();
    let user_id = user.user.id;

    let params = JSON.stringify(data);

    return this.http.post<any>(this.url + user_id + '/set_password/', params, httpOptions);
  }
}
