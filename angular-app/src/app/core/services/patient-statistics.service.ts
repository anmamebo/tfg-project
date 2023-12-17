import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../constants/API_URL';

// Servicios
import { HttpCommonService } from './http-common.service';

/**
 * Servicio para interactuar con la API para la gestión de estadísticas de pacientes.
 */
@Injectable({
  providedIn: 'root',
})
export class PatientStatisticsService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private _http: HttpClient,
    private _httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url + 'patient_statistics/';
  }

  /**
   * Obtiene las estadísticas generales.
   * @returns Observable con las estadísticas generales de la aplicación.
   */
  public getPatientOverallStats(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(this.url + 'get_overall_stats/', httpOptions);
  }

  /**
   * Obtiene las estadísticas de citas por especialidad y mes.
   * @param year Año del que se quieren obtener las estadísticas.
   * @returns Observable con las estadísticas de citas por especialidad y mes.
   */
  public getPatientAppointmentsPerSpecialtyAndMonth(
    year: number
  ): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    const params = new HttpParams().set('year', String(year));

    return this._http.get(
      this.url + 'get_patient_appointments_per_specialty_and_month/',
      { params, ...httpOptions }
    );
  }
}
