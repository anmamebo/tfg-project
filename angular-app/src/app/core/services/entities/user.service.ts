import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from 'src/app/core/constants/API_URL';

// Servicios
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

// Modelos
import { User } from 'src/app/core/models/user.interface';

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
    private _http: HttpClient,
    private _httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url + 'users/users/';
  }

  /**
   * Obtiene un usuario por su identificador.
   * @param {string} id El identificador del usuario.
   * @returns {Observable<User>} Un observable que emite la respuesta del servidor.
   */
  public getUserById(id: string): Observable<User> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<User>(`${this.url}${id}/`, httpOptions);
  }

  /**
   * Actualiza los datos de un usuario.
   * @param {User} user El objeto con los datos actualizados.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public updateUser(user: User): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(user);

    return this._http.put<any>(`${this.url}${user.id}/`, params, httpOptions);
  }

  /**
   * Actualiza la contraseña del usuario.
   * @param {{
   *   old_password: string;
   *   password: string;
   *   password2: string;
   * }} data - Los datos necesarios para actualizar la contraseña, como la nueva contraseña.
   * @returns {Observable<any>} Un Observable que se suscribe a la solicitud HTTP para actualizar la contraseña.
   */
  public updatePassword(data: {
    old_password: string;
    password: string;
    password2: string;
  }): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(data);

    return this._http.post<any>(
      `${this.url}set_password/`,
      params,
      httpOptions
    );
  }

  /**
   * Actualiza la imagen de perfil del usuario.
   * @param {string} userId - El ID del usuario.
   * @param {File} file - El archivo de imagen de perfil.
   * @returns {Observable<any>} Un Observable que se suscribe a la solicitud HTTP para actualizar la imagen de perfil.
   */
  public updateProfilePicture(userId: string, file: File): Observable<any> {
    let headers = this._httpCommonService.getCommonHeaders();
    headers = headers.delete('Content-Type');
    const httpOptions = { headers };

    let formData = new FormData();
    formData.append('profile_picture', file);

    return this._http.put<any>(
      `${this.url}${userId}/update_profile_picture/`,
      formData,
      httpOptions
    );
  }

  /**
   * Obtiene la imagen de perfil del usuario.
   * @returns {Observable<any>} Un Observable que se suscribe a la solicitud HTTP para obtener la imagen de perfil.
   */
  public getProfilePicture(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<any>(`${this.url}profile_picture/`, httpOptions);
  }

  /**
   * Elimina la imagen de perfil del usuario.
   * @returns {Observable<any>} Un Observable que se suscribe a la solicitud HTTP para eliminar la imagen de perfil.
   */
  public deleteProfilePicture(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.delete<any>(
      `${this.url}delete_profile_picture/`,
      httpOptions
    );
  }
}
