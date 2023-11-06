import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError } from "rxjs";

import { TokenStorageService } from './token-storage.service';

import { API_URL } from "../constants/API_URL";

import { Group } from "../models/group.model";


/**
 * Servicio para interactuar con la API para la gestión de grupos.
 */
@Injectable({
  providedIn: 'root'
})
export class GroupService {
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
   * Obtiene un grupo por su identificador.
   * @param id El identificador del grupo.
   * @returns Un observable que emite un objeto `Group`.
   */
  public getGroupById(id: number): Observable<Group> {
    let token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    const httpOptions = { headers };

    return this.http.get<Group>(this.url + 'users/groups/' + id + '/', httpOptions);
  }

  /**
   * Obtiene todos los grupos.
   * @returns Un observable que emite un array de objetos `Group`.
   */
  public getGroups(): Observable<Group[]> {
    let token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    const httpOptions = { headers };

    return this.http.get<Group[]>(this.url + 'users/groups/', httpOptions);
  }

  public createGroup(group: Group): Observable<any> {
    let token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    const httpOptions = { headers };

    let params = JSON.stringify(group);

    return this.http.post<any>(this.url + 'users/groups/', params, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            let errorMessage = '';
            throw new Error(errorMessage);
          }
          throw new Error(
            'Ocurrió un error en el servidor. Intentalo más tarde.'
          );
        })
      );
  }

}
