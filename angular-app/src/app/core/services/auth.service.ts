import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { jwtDecode } from "jwt-decode";

import { API_URL } from '../constants/API_URL';

// Servicios
import { TokenStorageService } from './token-storage.service';

// Modelos
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
  /** URL base de la API. */
  public url: string;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.url = API_URL.url;
  }

  /**
   * Inicia sesión con las credenciales de usuario proporcionadas.
   * @param user Credenciales de usuario.
   * @returns Un observable que emite un objeto `AuthResponse`.
   */
  public login(user: {username: string, password: string}): Observable<AuthResponse> {
    let params = JSON.stringify(user);

    return this.http.post<AuthResponse>(this.url + 'login/', params, httpOptions);
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

    return this.http.post<any>(this.url + 'logout/', user_id, httpOptions);
  }

  /**
   * Obtiene los roles del usuario actual a partir del token de autenticación. 
   * @returns Lista de roles del usuario actual.
   */
  public getRolesFromToken(): string[] {
    const token: string = this.tokenStorageService.getToken();
    const decodedToken: any = jwtDecode(token);
    const roles = decodedToken.groups || [];
    return roles;
  }
}
