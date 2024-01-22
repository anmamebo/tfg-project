import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { API_URL } from 'src/app/core/constants/API_URL';

// Servicios
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';

// Modelos
import { AuthResponse } from 'src/app/core/models/auth-response.interface';

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
  /** URL base de la API. */
  public url: string;

  constructor(
    private _http: HttpClient,
    private _tokenStorageService: TokenStorageService
  ) {
    this.url = API_URL.url;
  }

  /**
   * Inicia sesión con las credenciales de usuario proporcionadas.
   * @param {{
   *   username: string;
   *   password: string;
   * }} user Credenciales de usuario.
   * @returns {Observable<AuthResponse>} Un observable que emite la respuesta del servidor.
   */
  public login(user: {
    username: string;
    password: string;
  }): Observable<AuthResponse> {
    let params = JSON.stringify(user);

    return this._http.post<AuthResponse>(
      `${this.url}login/`,
      params,
      httpOptions
    );
  }

  /**
   * Verifica si el usuario ha iniciado sesión.
   * @returns {boolean} `true` si el usuario ha iniciado sesión, de lo contrario `false`.
   */
  public isLogin(): boolean {
    return this._tokenStorageService.getToken() ? true : false;
  }

  /**
   * Cierra la sesión del usuario actual.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public logOut(): Observable<any> {
    let user = this._tokenStorageService.signOut();
    let user_id = { user: user.user.id };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
    });
    const httpOptions = { headers };

    return this._http.post<any>(`${this.url}logout/`, user_id, httpOptions);
  }

  /**
   * Obtiene los roles del usuario actual a partir del token de autenticación.
   * @returns {string[]} Lista de roles del usuario actual.
   */
  public getRolesFromToken(): string[] {
    const token: string = this._tokenStorageService.getToken();
    const decodedToken: any = jwtDecode(token);
    const roles = decodedToken.groups || [];

    return roles;
  }

  /**
   * Envia un correo electrónico con un enlace para restablecer la contraseña.
   * @param email Correo electrónico del usuario.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public forgotPassword(email: string): Observable<any> {
    let params = JSON.stringify({ email });

    return this._http.post<any>(
      `${this.url}forget-password/`,
      params,
      httpOptions
    );
  }

  /**
   * Restablece la contraseña del usuario.
   * @param {{
   *   password: string;
   *   token: string;
   *   id: string;
   * }} data Datos para restablecer la contraseña.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public resetPassword(data: {
    password: string;
    token: string;
    id: string;
  }): Observable<any> {
    let params = JSON.stringify(data);

    return this._http.post<any>(
      `${this.url}reset-password/`,
      params,
      httpOptions
    );
  }
}
