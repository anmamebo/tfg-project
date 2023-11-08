import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, catchError } from "rxjs";

import { HttpCommonService } from "./http-common.service";

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
    private httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url;
  }

  /**
   * Obtiene un grupo por su identificador.
   * @param id El identificador del grupo.
   * @returns Un observable que emite un objeto `Group`.
   */
  public getGroupById(id: number): Observable<Group> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<Group>(this.url + 'users/groups/' + id + '/', httpOptions);
  }

  /**
   * Obtiene todos los grupos.
   * @returns Un observable que emite un array de objetos `Group`.
   */
  public getGroups(page: number): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    const params = new HttpParams().set('page', page.toString());

    return this.http.get<any>(this.url + 'users/groups/', { params, ...httpOptions });
  }

  /**
   * Crea un grupo.
   * @param group El objeto `Group` con los datos del grupo.
   * @returns Un observable que emite un objeto `Group`.
   */
  public createGroup(group: Group): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(group);

    return this.http.post<any>(this.url + 'users/groups/', params, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            let errorMessage = error.error.message || 'Hay errores en la creación del grupo';
            throw new Error(errorMessage);
          }
          throw new Error(
            'Ocurrió un error en el servidor. Intentalo más tarde.'
          );
        })
      );
  }

  /**
   * Actualiza los datos de un grupo.
   * @param group El objeto `Group` con los datos actualizados.
   * @returns Un observable que emite un objeto `any`.
   */
  public updateGroup(group: Group): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(group);

    return this.http.put<any>(this.url + 'users/groups/' + group.id + '/', params, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            let errorMessage = error.error.message || 'Hay errores en la actualización del grupo';
            throw new Error(errorMessage);
          }
          throw new Error(
            'Ocurrió un error en el servidor. Intentalo más tarde.'
          );
        })
      );
  }

  /**
   * Elimina un grupo.
   * @param id El identificador del grupo.
   * @returns Un observable que emite un objeto `any`.
   */
  public deleteGroup(id: number): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.delete<any>(this.url + 'users/groups/' + id + '/', httpOptions);
  }
}
