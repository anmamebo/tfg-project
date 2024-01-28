import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Servicios
import { EntityService } from 'src/app/core/services/generics/entity.service';
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

// Modelos
import { Doctor } from 'src/app/core/models/doctor.interface';

interface DoctorOptions {
  paginate?: boolean;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}

/**
 * Servicio para interactuar con la API para la gestión de médicos.
 */
@Injectable({
  providedIn: 'root',
})
export class DoctorService extends EntityService<Doctor> {
  /** Endpoint de la API. */
  public endpoint = 'doctors/';

  constructor(http: HttpClient, httpCommonService: HttpCommonService) {
    super(http, httpCommonService);
  }

  /**
   * Obtiene la URL del endpoint.
   * @returns {string} La URL del endpoint.
   */
  public getEndpoint(): string {
    return this.endpoint;
  }

  /**
   * Construye y retorna los parámetros para las peticiones HTTP.
   * @param {DoctorOptions} options - Opciones para construir los parámetros HTTP.
   * @returns {HttpParams} Los parámetros HTTP construidos para la consulta.
   */
  private _buildParams(options: DoctorOptions = {}): HttpParams {
    const { paginate = false, page, pageSize, searchTerm } = options;

    let params = new HttpParams();

    if (paginate) {
      // Si se quiere paginar

      if (page) {
        // Si se ha indicado la página
        params = params.set('page', page.toString());
      }

      if (pageSize) {
        // Si se ha indicado el número de resultados por página
        params = params.set('page_size', pageSize.toString());
      }

      params = params.set('paginate', 'true'); // Indica que se quiere paginar
    }

    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return params;
  }

  /**
   * Obtiene listado de médicos de un departamento.
   * @param {string} departmentId ID del departamento.
   * @param {DoctorOptions} options - Opciones para filtrar los resultados.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public getDoctorsByDepartmentId(
    departmentId: string,
    options: DoctorOptions = {}
  ): Observable<any> {
    let params = this._buildParams(options);
    params = params.set('department', departmentId);

    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<any>(`${this.url}${this.endpoint}department/`, {
      params,
      ...httpOptions,
    });
  }
}
