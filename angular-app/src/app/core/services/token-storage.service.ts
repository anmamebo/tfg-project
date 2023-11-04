import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  public signOut() {
    let user = this.getUser();
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);

    return user;
  }

  public saveTokenSession(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    if (sessionStorage.getItem(TOKEN_KEY)) {
      return sessionStorage.getItem(TOKEN_KEY) || '';
    } else if (localStorage.getItem(TOKEN_KEY)) {
      return localStorage.getItem(TOKEN_KEY) || '';
    }
    return '';
  }

  public saveUserSession(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    if (sessionStorage.getItem(USER_KEY)) {
      return JSON.parse(sessionStorage.getItem(USER_KEY) || '');
    } else if (localStorage.getItem(USER_KEY)) {
      return JSON.parse(localStorage.getItem(USER_KEY) || '');
    }
  }

  public saveSession(user: any) {
    this.saveTokenSession(user.token);
    this.saveUserSession(user);
  }

  public saveSingIn(user: any): void {
    this.saveSession(user);
  }
}
