import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from 'src/app/core/constants/API_URL';

// Servicios
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

/**
 * Servicio para interactuar con la API para la gestión de estadísticas de médicos.
 */
@Injectable({
  providedIn: 'root',
})
export class DoctorStatisticsService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private _http: HttpClient,
    private _httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url + 'doctor_statistics/';
  }

  /**
   * Obtiene las estadísticas generales.
   * @returns {Observable<any>} Observable con las estadísticas generales de la aplicación.
   */
  public getDoctorOverallStats(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(`${this.url}get_overall_stats/`, httpOptions);
  }

  /**
   * Obtiene las estadísticas de citas por día.
   * @param {number} month mes
   * @param {number} year año
   * @returns {Observable<any>} Observable con las estadísticas de citas por día.
   */
  public getDoctorAppointmentsPerDay(
    month: number,
    year: number
  ): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = new HttpParams();
    params = params.append('month', month.toString());
    params = params.append('year', year.toString());

    return this._http.get(`${this.url}get_appointments_per_day/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene las estadísticas de citas por género.
   * @returns {Observable<any>} Observable con las estadísticas de citas por género.
   */
  public getDoctorAppointmentsPerGender(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(
      `${this.url}get_appointments_per_gender/`,
      httpOptions
    );
  }

  /**
   * Obtiene las estadísticas de citas por especialidad.
   * @returns {Observable<any>} Observable con las estadísticas de citas por especialidad.
   */
  public getDoctorAppointmentsPerSpecialty(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(
      `${this.url}get_appointments_per_specialty/`,
      httpOptions
    );
  }

  /**
   * Obtiene las estadísticas de citas por edad.
   * @returns {Observable<any>} Observable con las estadísticas de citas por edad.
   */
  public getDoctorAppointmentsPerAge(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(`${this.url}get_appointments_per_age/`, httpOptions);
  }
}
