import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

// Servicios
import { EntityService } from './entity.service';
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Group } from "../models/group.model";


/**
 * Servicio para interactuar con la API para la gestión de grupos.
 */
@Injectable({
  providedIn: 'root'
})
export class GroupService extends EntityService<Group> {
  /** Endpoint de la API. */
  public endpoint = 'users/groups/';

  constructor(
    http: HttpClient,
    httpCommonService: HttpCommonService
  ) {
    super(http, httpCommonService);
  }

  /**
   * Obtiene la URL del endpoint.
   * @returns La URL del endpoint.
   */
  public getEndpoint(): string {
    return this.endpoint;
  }

  /**
   * Obtiene un grupo por su identificador.
   * @param id El identificador del grupo.
   * @returns Un observable que emite un objeto `Group`.
   */
  public getGroupById(id: number): Observable<Group> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<Group>(`${this.url}${this.endpoint}${id}/`, httpOptions);
  }

  /**
   * Obtiene todos los grupos.
   * @param page El número de página.
   * @returns Un observable que emite un array de objetos `any`.
   */
  public getGroups(page: number): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    const params = new HttpParams().set('page', page.toString());

    return this.http.get<any>(`${this.url}${this.endpoint}`, { params, ...httpOptions });
  }

  /**
   * Crea un grupo.
   * @param group El objeto `Group` con los datos del grupo.
   * @returns Un observable que emite un objeto `any`.
   */
  public createGroup(group: Group): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(group);

    return this.http.post<any>(`${this.url}${this.endpoint}`, params, httpOptions);
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

    return this.http.put<any>(`${this.url}${this.endpoint}${group.id}/`, params, httpOptions);
  }

  /**
   * Elimina un grupo.
   * @param id El identificador del grupo.
   * @returns Un observable que emite un objeto `any`.
   */
  public deleteGroup(id: number): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.delete<any>(`${this.url}${this.endpoint}${id}/`, httpOptions);
  }
}
