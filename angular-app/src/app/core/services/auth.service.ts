import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";

import { TokenStorageService } from "./token-storage.service";

import { API_URL } from "../constants/API_URL";

import { User } from "../models/user.model";
import { AuthResponse } from "../models/auth-response";

// Configuración de encabezados HTTP
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
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

    console.log("params: " + params);

    return this.http.post<AuthResponse>(this.url + 'login', params, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            throw new Error('Usuario o contraseña incorrectos');
          }
          throw new Error('Ocurrió un error en el servidor. Intentalo más tarde.');
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

  public logOut(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
