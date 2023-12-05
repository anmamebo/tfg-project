import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../constants/API_URL';

// Servicios
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Treatment } from "../models/treatment.model";


/**
 * Servicio para interactuar con la API para la gestión de tratamientos.
 */
@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  /** URL base de la API. */
  public url: string;
  
  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService
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
    const headers = this.httpCommonService.getCommonHeaders();
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

    return this.http.get<any>(`${this.url}list_for_appointment/`, { params, ...httpOptions })
  }

  /**
   * Crear un tratamiento.
   * @param treatment El tratamiento a crear.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public createTreatment(treatment: Treatment): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(treatment);

    return this.http.post<any>(`${this.url}`, params, httpOptions);
  }
}
