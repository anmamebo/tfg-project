import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

// Servicios
import { EntityService } from "./entity.service";
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Permission } from "../models/permission.model";


/**
 * Servicio para interactuar con la API para la gestión de permisos.
 */
@Injectable({
  providedIn: 'root'
})
export class PermissionService extends EntityService<Permission> {
  /** Endpoint de la API. */
  public endpoint = 'users/permissions/';

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
   * Obtiene todos los permisos.
   * @param page El número de página que se quiere obtener.
   * @param searchTerm Término de búsqueda.
   * @returns Un observable que emite un objeto `any`.
   */
  public getPermissions(page: number, pageSize: number, searchTerm: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    // Parámetros de la petición
    let params = new HttpParams().set('page', page.toString());
    params = params.set('page_size', pageSize.toString());

    // Comprueba si se ha indicado un término de búsqueda
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.http.get<any>(`${this.url}${this.endpoint}`, { params, ...httpOptions });
  }
}
