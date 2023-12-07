import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../constants/API_URL';

// Servicios
import { HttpCommonService } from './http-common.service';

// Modelos
import { Appointment } from '../models/appointment.model';

/**
 * Servicio para interactuar con la API para la gestión de citas.
 */
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url + 'appointments/appointments/';
  }

  /**
   * Actualiza la cita.
   * @param id El identificador de la cita.
   * @param item El objeto con los datos de la cita.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public update(id: string, item: Appointment): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(item);

    return this.http.put<any>(`${this.url}${id}/`, params, httpOptions);
  }

  /**
   * Obtiene una cita por su id para un doctor.
   * @param id Id de la cita.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public getAppointmentByIdByDoctor(id: string): Observable<Appointment> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<Appointment>(
      `${this.url}${id}/retrieve_for_doctor/`,
      httpOptions
    );
  }

  /**
   * Obtiene las citas de un médico.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public getAppointmentsByDoctor(
    statuses: string[] | null,
    page?: number,
    numResults?: number,
    searchTerm?: string,
    paginated: boolean = false,
    state?: boolean | null,
    sortBy?: string,
    sortOrder?: string
  ): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
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

    if (state !== null && state !== undefined) {
      // Si se ha indicado un estado
      params = params.set('state', state.toString());
    }

    if (sortBy && sortOrder) {
      // Si se ha indicado un campo por el que ordenar
      params = params.set(
        'ordering',
        `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
      );
    }

    return this.http.get<any>(`${this.url}list_for_doctor/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene las citas de un paciente.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public getAppointmentsByPatient(
    statuses: string[] | null,
    page?: number,
    numResults?: number,
    searchTerm?: string,
    paginated: boolean = false,
    state?: boolean | null,
    sortBy?: string,
    sortOrder?: string
  ): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
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

    if (state !== null && state !== undefined) {
      // Si se ha indicado un estado
      params = params.set('state', state.toString());
    }

    if (sortBy && sortOrder) {
      // Si se ha indicado un campo por el que ordenar
      params = params.set(
        'ordering',
        `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
      );
    }

    return this.http.get<any>(`${this.url}list_for_patient/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Actualiza el estado de una cita.
   * @param id ID de la cita.
   * @param status Estado de la cita.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public updateStatus(id: string, status: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.put<any>(
      `${this.url}${id}/update_status/`,
      { status },
      httpOptions
    );
  }
}
