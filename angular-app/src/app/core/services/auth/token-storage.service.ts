import { Injectable } from '@angular/core';

/** Clave para almacenar el token de autenticación en el almacenamiento de sesión. */
const TOKEN_KEY = 'auth-token';

/** Clave para almacenar los datos del usuario en el almacenamiento de sesión. */
const USER_KEY = 'auth-user';

/** Clave para almacenar el token de actualización en el almacenamiento de sesión. */
const REFRESH_TOKEN_KEY = 'auth-refresh-token';

/**
 * Servicio para el almacenamiento y gestión de tokens de autenticación y datos de usuario en el almacenamiento de sesión.
 */
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  /**
   * Cierra la sesión del usuario actual y elimina el token y los datos del usuario del almacenamiento de sesión.
   * @returns {any} Los datos del usuario antes de cerrar la sesión.
   */
  public signOut(): any {
    let user = this.getUser();
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);

    return user;
  }

  /**
   * Almacena el token de autenticación en el almacenamiento de sesión.
   * @param {string} token El token de autenticación a almacenar.
   */
  public saveTokenSession(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Obtiene el token de autenticación almacenado en el almacenamiento de sesión.
   * @returns {string} El token de autenticación.
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }

  /**
   * Almacena el token de actualización en el almacenamiento de sesión.
   * @param {string} token El token de actualización a almacenar.
   */
  public saveRefreshTokenSession(token: string): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  /**
   * Obtiene el token de actualización almacenado en el almacenamiento de sesión.
   * @returns {string} El token de actualización.
   */
  public getRefreshToken(): string {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY) || '';
  }

  /**
   * Almacena los datos del usuario en el almacenamiento de sesión.
   * @param {any} user Los datos del usuario a almacenar.
   */
  public saveUserSession(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Obtiene los datos del usuario almacenados en el almacenamiento de sesión.
   * @returns {any} Los datos del usuario.
   */
  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || '{}');
  }

  /**
   * Actualiza los datos del usuario en el almacenamiento de sesión.
   * @param {any} userUpdated Los datos del usuario actualizados.
   */
  public updateUser(userUpdated: any): void {
    let user = this.getUser();

    if (
      user.email != userUpdated.email ||
      user.name != userUpdated.name ||
      user.last_name != userUpdated.last_name
    ) {
      user.email = userUpdated.email;
      user.name = userUpdated.name;
      user.last_name = userUpdated.last_name;

      this.saveUserSession(user);
    }
  }

  /**
   * Almacena el token de autenticación y los datos del usuario en el almacenamiento de sesión.
   * @param {any} user Los datos del usuario con el token de autenticación.
   */
  public saveSession(user: any): void {
    this.saveTokenSession(user.token);
    this.saveRefreshTokenSession(user.refresh_token);
    this.saveUserSession(user.user);
  }

  /**
   * Almacena el token de autenticación y los datos del usuario en el almacenamiento de sesión.
   * @param {any} user Los datos del usuario con el token de autenticación.
   */
  public saveSignIn(user: any): void {
    this.saveSession(user);
  }
}
