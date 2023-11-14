import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { HttpCommonService } from "./http-common.service";

import { API_URL } from "../constants/API_URL";


/**
 * Servicio para interactuar con la API para la gestión de permisos.
 */
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url;
  }

  /**
   * Obtiene todos los permisos.
   * @param page El número de página que se quiere obtener.
   * @param searchTerm Término de búsqueda.
   * @returns Un observable que emite un objeto `any`.
   */
  public getPermissions(page: number, searchTerm: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    // Parámetros de la petición
    let params = new HttpParams().set('page', page.toString());

    // Comprueba si se ha indicado un término de búsqueda
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.http.get<any>(this.url + 'users/permissions/', { params, ...httpOptions });
  }
}
