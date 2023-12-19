import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../../constants/API_URL';

// Servicios
import { HttpCommonService } from '../http-common/http-common.service';

/**
 * Servicio para interactuar con la API para la gestión de estadísticas.
 */
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private _http: HttpClient,
    private _httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url + 'statistics/';
  }

  /**
   * Obtiene las estadísticas generales.
   * @returns Observable con las estadísticas generales de la aplicación.
   */
  public getOverallStats(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(this.url + 'get_overall_stats/', httpOptions);
  }

  /**
   * Obtiene las estadísticas de citas por día.
   * @param month mes
   * @param year año
   * @returns Observable con las estadísticas de citas por día.
   */
  public getAppointmentsPerDay(month: number, year: number): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = new HttpParams();
    params = params.append('month', month.toString());
    params = params.append('year', year.toString());

    return this._http.get(this.url + 'get_appointments_per_day/', {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene las estadísticas de citas por día y por género.
   * @param month mes
   * @param year año
   * @returns Observable con las estadísticas de citas por día.
   */
  public getAppointmentsPerDayAndGender(
    month: number,
    year: number
  ): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = new HttpParams();
    params = params.append('month', month.toString());
    params = params.append('year', year.toString());

    return this._http.get(this.url + 'get_appointments_per_day_and_gender/', {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene las estadísticas de citas por estado.
   * @returns Observable con las estadísticas de citas por estado.
   */
  public getAppointmentsPerStatus(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(this.url + 'get_appointment_statuses/', httpOptions);
  }

  /**
   * Obtiene el tiempo medio de espera de las citas.
   * @returns Observable con el tiempo medio de espera de las citas.
   */
  public getAverageWaitingTime(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(this.url + 'average_waiting_time/', httpOptions);
  }

  /**
   * Obtiene las estadísticas de citas por mes y por tipo para un año.
   * @param year año
   * @returns Observable con las estadísticas de citas por mes y por tipo para un año.
   */
  public getAppointmentsPerMonthAndType(year: number): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = new HttpParams();
    params = params.append('year', year.toString());

    return this._http.get(this.url + 'get_appointments_per_month_and_type/', {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene la cantidad de doctores por especialidad médica.
   * @returns Observable con la cantidad de doctores por especialidad médica.
   */
  public getMedicalSpecialtyDoctorCount(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(
      this.url + 'medical_specialty_doctor_count/',
      httpOptions
    );
  }

  /**
   * Obtiene las estadísticas de citas por edad.
   * @returns Observable con las estadísticas de citas por edad.
   */
  public getAppointmentsPerAge(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(this.url + 'get_appointments_per_age/', httpOptions);
  }
}