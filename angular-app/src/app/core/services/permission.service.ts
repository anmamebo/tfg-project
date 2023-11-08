import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, catchError } from "rxjs";

import { HttpCommonService } from "./http-common.service";

import { API_URL } from "../constants/API_URL";

import { Permission } from "../models/permission.model";

/**
 * Servicio para interactuar con la API para la gestión de permisos.
 */
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  /**
   * URL base de la API.
   */
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
   * @returns Un observable que emite un objeto `any`.
   */
  public getPermissions(page: number): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    const params = new HttpParams().set('page', page.toString());

    return this.http.get<any>(this.url + 'users/permissions/', { params, ...httpOptions });
  }
}
