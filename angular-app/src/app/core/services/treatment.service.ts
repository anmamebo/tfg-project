import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../constants/API_URL';

// Servicios
import { HttpCommonService } from './http-common.service';

// Modelos
import { Treatment } from '../models/treatment.model';

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
   * Obtiene los tratamientos de una cita.
   * @param appointmentId Id de la cita.
   * @param page Número de página.
   * @param numResults Número de resultados por página.
   * @param searchTerm Término de búsqueda.
   * @param paginated Indica si se debe paginar el resultado.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public getTreatmentsByAppointment(
    appointmentId: string,
    page?: number,
    numResults?: number,
    searchTerm?: string,
    paginated: boolean = false
  ): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = new HttpParams();

    if (paginated) {
      if (page) {
        params = params.append('page', page.toString());
      }

      if (numResults) {
        params = params.append('page_size', numResults.toString());
      }

      params = params.append('paginate', 'true');
    }

    params = params.append('appointment_id', appointmentId);

    return this._http.get<any>(`${this.url}list_for_appointment/`, {
      params,
      ...httpOptions,
    });
  }

  public getTreatmentsByPatient(
    statuses: string[] | null,
    page?: number,
    numResults?: number,
    searchTerm?: string,
    paginated: boolean = false,
    sortBy?: string,
    sortOrder?: string
  ): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = new HttpParams();

    if (statuses) {
      // Si se han indicado los estados
      statuses.forEach((status) => {
        params = params.append('status', status);
      });
    }

    if (paginated) {
      // Si se quiere paginar

      if (page) {
        // Si se ha indicado la página
        params = params.set('page', page.toString());
      }

      if (numResults) {
        // Si se ha indicado el número de resultados por página
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

    return this._http.get<any>(`${this.url}list_for_patient/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Crear un tratamiento.
   * @param treatment El tratamiento a crear.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public createTreatment(treatment: Treatment): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(treatment);

    return this._http.post<any>(`${this.url}`, params, httpOptions);
  }

  /**
   * Actualiza el estado de un tratamiento.
   * @param id ID del tratamiento.
   * @param status Estado del tratamiento.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public updateStatus(id: string, status: string): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.put<any>(
      `${this.url}${id}/update_status/`,
      { status },
      httpOptions
    );
  }
}
