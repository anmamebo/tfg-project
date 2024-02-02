import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from 'src/app/core/constants/API_URL';

// Servicios
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

// Modelos
import { Appointment } from 'src/app/core/models/appointment.interface';

interface AppointmentOptions {
  date?: string;
  statuses?: string[];
  types?: string[];
  specialties?: string[];
  page?: number;
  numResults?: number;
  searchTerm?: string;
  paginate?: boolean;
  state?: boolean | null;
  sortBy?: string;
  sortOrder?: string;
  scheduleStartTimeFrom?: string;
  scheduleStartTimeTo?: string;
  requestDateFrom?: string;
  requestDateTo?: string;
}

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
    private _http: HttpClient,
    private _httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url + 'appointments/';
  }

  /**
   * Actualiza la cita.
   * @param {string} id El identificador de la cita.
   * @param {Appointment} item El objeto con los datos de la cita.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public update(id: string, item: Appointment): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(item);

    return this._http.put<any>(`${this.url}${id}/`, params, httpOptions);
  }

  /**
   * Obtiene una cita por su id para un doctor.
   * @param {string} id Id de la cita.
   * @returns {Observable<Appointment>} Un observable que emite la respuesta del servidor.
   */
  public getAppointmentByIdForDoctor(id: string): Observable<Appointment> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<Appointment>(`${this.url}${id}`, httpOptions);
  }

  /**
   * Construye y retorna los parámetros para las peticiones HTTP.
   * @param {AppointmentOptions} options - Opciones para construir los parámetros HTTP.
   * @returns {HttpParams} Los parámetros HTTP construidos para la consulta.
   */
  private _buildParams(options: AppointmentOptions = {}): HttpParams {
    const {
      date,
      statuses,
      types,
      specialties,
      page,
      numResults,
      searchTerm,
      paginate = false,
      state = true,
      sortBy,
      sortOrder,
      scheduleStartTimeFrom,
      scheduleStartTimeTo,
      requestDateFrom,
      requestDateTo,
    } = options;

    let params = new HttpParams();

    if (date) {
      // Si se ha indicado la fecha
      params = params.set('date', date);
    }

    if (statuses) {
      // Si se han indicado los estados
      statuses.forEach((status) => {
        params = params.append('status', status);
      });
    }

    if (types) {
      // Si se han indicado los tipos
      types.forEach((type) => {
        params = params.append('type', type);
      });
    }

    if (specialties) {
      // Si se han indicado las especialidades
      specialties.forEach((specialty) => {
        params = params.append('specialty', specialty);
      });
    }

    if (scheduleStartTimeFrom) {
      // Si se ha indicado la hora de inicio de la cita
      params = params.set('schedule__start_time__gte', scheduleStartTimeFrom);
    }

    if (scheduleStartTimeTo) {
      // Si se ha indicado la hora de fin de la cita
      params = params.set('schedule__start_time__lte', scheduleStartTimeTo);
    }

    if (requestDateFrom) {
      // Si se ha indicado la fecha de solicitud de la cita
      params = params.set('request_date__gte', requestDateFrom);
    }

    if (requestDateTo) {
      // Si se ha indicado la fecha de solicitud de la cita
      params = params.set('request_date__lte', requestDateTo);
    }

    if (paginate) {
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

    return params;
  }

  /**
   * Obtiene las citas de un médico con opciones específicas.
   * @param {AppointmentOptions} options - Opciones para filtrar las citas del medico.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public getAppointmentsByDoctor(
    options: AppointmentOptions = {}
  ): Observable<any> {
    const params = this._buildParams(options);

    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<any>(`${this.url}doctor/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene las citas de un paciente con opciones específicas.
   * @param {AppointmentOptions} options - Opciones para filtrar las citas del paciente.
   * @param {string | null} patientId - Id del paciente.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public getAppointmentsByPatient(
    options: AppointmentOptions = {},
    patientId: string | null = null
  ): Observable<any> {
    let params = this._buildParams(options);

    if (patientId) {
      params = params.set('patient_id', patientId);
    }

    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<any>(`${this.url}patient/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene las citas de un médico para un día específico, con opciones específicas.
   * @param {AppointmentOptions} options - Opciones para filtrar las citas del médico.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public getAppointmentsByDoctorAndDay(
    options: AppointmentOptions = {
      date: new Date().toISOString().slice(0, 10),
    }
  ): Observable<any> {
    const params = this._buildParams(options);

    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<any>(`${this.url}doctor/date/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene las citas de un paciente para un día específico, con opciones específicas.
   * @param {AppointmentOptions} options - Opciones para filtrar las citas del paciente.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public getAppointmentsByPatientAndDay(
    options: AppointmentOptions = {
      date: new Date().toISOString().slice(0, 10),
    }
  ): Observable<any> {
    const params = this._buildParams(options);

    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<any>(`${this.url}patient/date/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Crea una cita.
   * @param {Appointment} appointment Objeto con los datos de la cita.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public createAppointment(appointment: Appointment): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(appointment);

    return this._http.post<any>(`${this.url}`, params, httpOptions);
  }

  /**
   * Actualiza el estado de una cita.
   * @param {string} id ID de la cita.
   * @param {string} status Estado de la cita.
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
}
