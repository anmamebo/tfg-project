import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/core/constants/API-URL.constants';
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

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
    this.url = API_URL + 'statistics/';
  }

  /**
   * Obtiene las estadísticas generales.
   * @returns {Observable<any>} Observable con las estadísticas generales de la aplicación.
   */
  public getOverallStats(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(`${this.url}general/`, httpOptions);
  }

  /**
   * Obtiene las estadísticas de citas por día.
   * @param {number} month mes
   * @param {number} year año
   * @returns {Observable<any>} Observable con las estadísticas de citas por día.
   */
  public getAppointmentsPerDay(month: number, year: number): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = new HttpParams();
    params = params.append('month', month.toString());
    params = params.append('year', year.toString());

    return this._http.get(`${this.url}appointments-per-day/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene las estadísticas de citas por día y por género.
   * @param {number} month mes
   * @param {number} year año
   * @returns {Observable<any>} Observable con las estadísticas de citas por día.
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

    return this._http.get(`${this.url}appointments-per-day-and-gender/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene las estadísticas de citas por estado.
   * @returns {Observable<any>} Observable con las estadísticas de citas por estado.
   */
  public getAppointmentsPerStatus(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(`${this.url}appointment-statuses/`, httpOptions);
  }

  /**
   * Obtiene el tiempo medio de espera de las citas.
   * @returns {Observable<any>} Observable con el tiempo medio de espera de las citas.
   */
  public getAverageWaitingTime(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(`${this.url}average-waiting-time/`, httpOptions);
  }

  /**
   * Obtiene las estadísticas de citas por mes y por tipo para un año.
   * @param {number} year año
   * @returns {Observable<any>} Observable con las estadísticas de citas por mes y por tipo para un año.
   */
  public getAppointmentsPerMonthAndType(year: number): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = new HttpParams();
    params = params.append('year', year.toString());

    return this._http.get(`${this.url}appointments-per-month-and-type/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene la cantidad de doctores por especialidad médica.
   * @returns {Observable<any>} Observable con la cantidad de doctores por especialidad médica.
   */
  public getMedicalSpecialtyDoctorCount(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(
      `${this.url}medical-specialty-doctor-count/`,
      httpOptions
    );
  }

  /**
   * Obtiene las estadísticas de citas por edad.
   * @returns {Observable<any>} Observable con las estadísticas de citas por edad.
   */
  public getAppointmentsPerAge(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(`${this.url}appointments-per-age/`, httpOptions);
  }
}
