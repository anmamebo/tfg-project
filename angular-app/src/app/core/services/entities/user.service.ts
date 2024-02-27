import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { User } from '@app/core/models/user.interface';
import { EntityService } from '@app/core/services/generics/entity.service';
import { HttpCommonService } from '@app/core/services/http-common/http-common.service';
import { Observable } from 'rxjs';

/**
 * Servicio para interactuar con la API para la gestión de usuarios.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService extends EntityService<User> {
  /** Endpoint de la API. */
  public endpoint = 'users/users/';

  constructor(http: HttpClient, httpCommonService: HttpCommonService) {
    super(http, httpCommonService);
  }

  /**
   * Obtiene la URL del endpoint.
   * @returns {string} La URL del endpoint.
   */
  public getEndpoint(): string {
    return this.endpoint;
  }

  /**
   * Actualiza la contraseña del usuario.
   * @param {{
   *   old_password: string;
   *   password: string;
   *   password2: string;
   * }} data - Los datos necesarios para actualizar la contraseña, como la nueva contraseña.
   * @returns {Observable<MessageResponse>} Un Observable que se suscribe a la solicitud HTTP para actualizar la contraseña.
   */
  public updatePassword(data: {
    old_password: string;
    password: string;
    password2: string;
  }): Observable<MessageResponse> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(data);

    return this.http.post<MessageResponse>(
      `${this.url}${this.endpoint}set-password/`,
      params,
      httpOptions
    );
  }

  /**
   * Actualiza la imagen de perfil del usuario.
   * @param {File} file - El archivo de imagen de perfil.
   * @returns {Observable<any>} Un Observable que se suscribe a la solicitud HTTP para actualizar la imagen de perfil.
   */
  public updateProfilePicture(file: File): Observable<any> {
    let headers = this.httpCommonService.getCommonHeaders();
    headers = headers.delete('Content-Type');
    const httpOptions = { headers };

    let formData = new FormData();
    formData.append('profile_picture', file);

    return this.http.put<any>(
      `${this.url}${this.endpoint}profile-picture/`,
      formData,
      httpOptions
    );
  }

  /**
   * Obtiene la imagen de perfil del usuario.
   * @returns {Observable<any>} Un Observable que se suscribe a la solicitud HTTP para obtener la imagen de perfil.
   */
  public getProfilePicture(): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<any>(
      `${this.url}${this.endpoint}profile-picture/`,
      httpOptions
    );
  }

  /**
   * Elimina la imagen de perfil del usuario.
   * @returns {Observable<MessageResponse>} Un Observable que se suscribe a la solicitud HTTP para eliminar la imagen de perfil.
   */
  public deleteProfilePicture(): Observable<MessageResponse> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.delete<MessageResponse>(
      `${this.url}${this.endpoint}profile-picture/`,
      httpOptions
    );
  }
}
