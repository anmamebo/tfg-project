import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Servicios
import { EntityService } from './entity.service';
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Doctor } from "../models/doctor.model";


/**
 * Servicio para interactuar con la API para la gestión de médicos.
 */
@Injectable({
  providedIn: 'root'
})
export class DoctorService extends EntityService<Doctor> {
  /** Endpoint de la API. */
  public endpoint = 'doctors/doctors/';

  constructor(
    http: HttpClient,
    httpCommonService: HttpCommonService,
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
   * Obtiene listado de médicos de un departamento.
   * @param id ID del departamento.
   * @param page página actual.
   * @param pageSize tamaño de la página.
   * @returns Un observable que emite un objeto `any`.
   */
  public getDoctorsByDepartmentId(id: number, page: number, pageSize: number, searchTerm: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = new HttpParams().set('department', id.toString());
    params = params.set('page', page.toString());
    params = params.set('page_size', pageSize.toString());
    params = params.set('paginate', 'true');

    // Comprueba si se ha indicado un término de búsqueda
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.http.get<any>(`${this.url}${this.endpoint}doctors_by_department/`, { params, ...httpOptions });
  }
}
