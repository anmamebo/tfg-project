import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalSpecialty } from '@app/core/models/medical-specialty.interface';
import { EntityService } from '@app/core/services/generics/entity.service';
import { HttpCommonService } from '@app/core/services/http-common/http-common.service';
import { Observable } from 'rxjs';
import { ListResponse } from '../../models/response/list-response.interface';

interface MedicalSpecialtyOptions {
  paginate?: boolean;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}

/**
 * Servicio para interactuar con la API para la gestión de especialidades médicas.
 */
@Injectable({
  providedIn: 'root',
})
export class MedicalspecialtyService extends EntityService<MedicalSpecialty> {
  /** URL del endpoint. */
  public endpoint = 'medicalspecialties/';

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
  private _buildParams(options: MedicalSpecialtyOptions = {}): HttpParams {
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
   * Obtiene listado de especialidades médicas de un departamento.
   * @param {string} departmentId ID del departamento.
   * @param {MedicalSpecialtyOptions} options - Opciones para filtrar los resultados.
   * @returns {Observable<ListResponse<MedicalSpecialty>>} Un observable que emite un objeto la respuesta del servidor.
   */
  public getRoomsByDepartmentId(
    departmentId: string,
    options: MedicalSpecialtyOptions = {}
  ): Observable<ListResponse<MedicalSpecialty>> {
    let params = this._buildParams(options);
    params = params.set('department', departmentId);

    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<ListResponse<MedicalSpecialty>>(
      `${this.url}${this.endpoint}department`,
      {
        params,
        ...httpOptions,
      }
    );
  }
}
