import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from 'src/app/core/constants/API_URL';

// Servicios
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

// Modelos
import { Treatment } from 'src/app/core/models/treatment.interface';

interface TreatmentOptions {
  statuses?: string[];
  page?: number;
  numResults?: number;
  searchTerm?: string;
  paginate?: boolean;
  sortBy?: string;
  sortOrder?: string;
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
}

/**
 * Servicio para interactuar con la API para la gestión de tratamientos.
 */
@Injectable({
  providedIn: 'root',
})
export class TreatmentService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private _http: HttpClient,
    private _httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url + 'treatments/treatments/';
  }

  /**
   * Construye y retorna los parámetros para las peticiones HTTP.
   * @param {TreatmentOptions} options - Opciones para construir los parámetros HTTP.
   * @returns {HttpParams} Los parámetros HTTP construidos para la consulta.
   */
  private _buildParams(options: TreatmentOptions = {}): HttpParams {
    const {
      statuses,
      page,
      numResults,
      searchTerm,
      paginate = false,
      sortBy,
      sortOrder,
      startDateFrom,
      startDateTo,
      endDateFrom,
      endDateTo,
    } = options;

    let params = new HttpParams();

    if (statuses) {
      statuses.forEach((status) => {
        params = params.append('status', status);
      });
    }

    if (startDateFrom) {
      params = params.set('start_date__gte', startDateFrom);
    }

    if (startDateTo) {
      params = params.set('start_date__lte', startDateTo);
    }

    if (endDateFrom) {
      params = params.set('end_date__gte', endDateFrom);
    }

    if (endDateTo) {
      params = params.set('end_date__lte', endDateTo);
    }

    if (paginate) {
      if (page) {
        params = params.set('page', page.toString());
      }

      if (numResults) {
        params = params.set('page_size', numResults.toString());
      }

      params = params.set('paginate', 'true'); // Indica que se quiere paginar
    }

    if (searchTerm) {
      // Si se ha indicado un término de búsqueda
      params = params.set('search', searchTerm);
    }

    if (sortBy && sortOrder) {
      // Si se ha indicado un campo por el que ordenar
      params = params.set(
        'ordering',
        `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
      );
    }

    return params;
  }

  /**
   * Obtiene los tratamientos de una cita.
   * @param {string} appointmentId Id de la cita.
   * @param {TreatmentOptions} options - Opciones para filtrar los tratamientos.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public getTreatmentsByAppointment(
    appointmentId: string,
    options: TreatmentOptions = {}
  ): Observable<any> {
    let params = this._buildParams(options);
    params = params.append('appointment_id', appointmentId);

    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<any>(`${this.url}appointment/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene los tratamientos de un paciente.
   * @param {TreatmentOptions} options - Opciones para filtrar los tratamientos.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public getTreatmentsByPatient(
    options: TreatmentOptions = {}
  ): Observable<any> {
    const params = this._buildParams(options);

    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<any>(`${this.url}patient/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Crear un tratamiento.
   * @param {Treatment} treatment El tratamiento a crear.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public createTreatment(treatment: Treatment): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(treatment);

    return this._http.post<any>(`${this.url}`, params, httpOptions);
  }

  /**
   * Actualiza el estado de un tratamiento.
   * @param {string} id ID del tratamiento.
   * @param {string} status Estado del tratamiento.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public updateStatus(id: string, status: string): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.put<any>(
      `${this.url}${id}/status/`,
      { status },
      httpOptions
    );
  }

  /**
   * Actualiza un tratamiento.
   * @param {string} id ID del tratamiento.
   * @param {Treatment} treatment El tratamiento a actualizar.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public updateTreatment(id: string, treatment: Treatment): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(treatment);

    return this._http.put<any>(`${this.url}${id}/`, params, httpOptions);
  }

  /**
   * Elimina un tratamiento.
   * @param {string} id ID del tratamiento.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public deleteTreatment(id: string): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.delete<any>(`${this.url}${id}/`, httpOptions);
  }
}
