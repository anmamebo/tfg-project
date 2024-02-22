import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/core/constants/API-URL.constants';
import { AuthResponse } from 'src/app/core/models/response/auth-response.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

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
    private _tokenStorageService: TokenStorageService,
    private _httpCommonService: HttpCommonService
  ) {
    this.url = API_URL;
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
   * Registra un nuevo usuario.
   * @param {any} user Datos del usuario a registrar.
   * @returns {Observable<MessageResponse>} Un observable que emite la respuesta del servidor.
   */
  public signup(user: any): Observable<MessageResponse> {
    let params = JSON.stringify(user);

    return this._http.post<MessageResponse>(
      `${this.url}signup/`,
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
   * @returns {Observable<MessageResponse>} Un observable que emite la respuesta del servidor.
   */
  public logOut(): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };
    let user = this._tokenStorageService.signOut();
    let user_id = { user: user.id };

    return this._http.post<MessageResponse>(
      `${this.url}logout/`,
      user_id,
      httpOptions
    );
  }

  /**
   * Refresca el token de autenticación.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public refreshToken(): Observable<any> {
    const refreshToken = this._tokenStorageService.getRefreshToken();

    return this._http.post(`${this.url}token/refresh/`, {
      refresh: refreshToken,
    });
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
   * @returns {Observable<MessageResponse>} Un observable que emite la respuesta del servidor.
   */
  public forgotPassword(email: string): Observable<MessageResponse> {
    let params = JSON.stringify({ email });

    return this._http.post<MessageResponse>(
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
   * @returns {Observable<MessageResponse>} Un observable que emite la respuesta del servidor.
   */
  public resetPassword(data: {
    password: string;
    token: string;
    id: string;
  }): Observable<MessageResponse> {
    let params = JSON.stringify(data);

    return this._http.post<MessageResponse>(
      `${this.url}reset-password/`,
      params,
      httpOptions
    );
  }
}
