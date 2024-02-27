import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@app/core/constants/API-URL.constants';
import { ListResponse } from '@app/core/models/response/list-response.interface';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { Treatment } from '@app/core/models/treatment.interface';
import { HttpCommonService } from '@app/core/services/http-common/http-common.service';
import { Observable } from 'rxjs';

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
    this.url = API_URL + 'treatments/';
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
   * @returns {Observable<ListResponse<Treatment>>} Un observable que emite la respuesta del servidor.
   */
  public getTreatmentsByAppointment(
    appointmentId: string,
    options: TreatmentOptions = {}
  ): Observable<ListResponse<Treatment>> {
    let params = this._buildParams(options);
    params = params.append('appointment_id', appointmentId);

    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<ListResponse<Treatment>>(`${this.url}appointment/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene los tratamientos de un paciente.
   * @param {TreatmentOptions} options - Opciones para filtrar los tratamientos.
   * @param {string | null} patientId - Id del paciente.
   * @returns {Observable<ListResponse<Treatment>>} Un observable que emite la respuesta del servidor.
   */
  public getTreatmentsByPatient(
    options: TreatmentOptions = {},
    patientId: string | null = null
  ): Observable<ListResponse<Treatment>> {
    let params = this._buildParams(options);

    if (patientId) {
      params = params.set('patient_id', patientId);
    }

    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<ListResponse<Treatment>>(`${this.url}patient/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Crear un tratamiento.
   * @param {Treatment} treatment El tratamiento a crear.
   * @returns {Observable<MessageResponse>} Un observable que emite la respuesta del servidor.
   */
  public createTreatment(treatment: Treatment): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(treatment);

    return this._http.post<MessageResponse>(`${this.url}`, params, httpOptions);
  }

  /**
   * Actualiza el estado de un tratamiento.
   * @param {string} id ID del tratamiento.
   * @param {string} status Estado del tratamiento.
   * @returns {Observable<MessageResponse>} Un observable que emite la respuesta del servidor.
   */
  public updateStatus(id: string, status: string): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.put<MessageResponse>(
      `${this.url}${id}/status/`,
      { status },
      httpOptions
    );
  }

  /**
   * Actualiza un tratamiento.
   * @param {string} id ID del tratamiento.
   * @param {Treatment} treatment El tratamiento a actualizar.
   * @returns {Observable<MessageResponse>} Un observable que emite la respuesta del servidor.
   */
  public updateTreatment(
    id: string,
    treatment: Treatment
  ): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(treatment);

    return this._http.put<MessageResponse>(
      `${this.url}${id}/`,
      params,
      httpOptions
    );
  }

  /**
   * Elimina un tratamiento.
   * @param {string} id ID del tratamiento.
   * @returns {Observable<MessageResponse>} Un observable que emite la respuesta del servidor.
   */
  public deleteTreatment(id: string): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.delete<MessageResponse>(`${this.url}${id}/`, httpOptions);
  }
}
