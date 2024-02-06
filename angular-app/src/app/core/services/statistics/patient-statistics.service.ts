import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/core/constants/API-URL.constants';
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

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
    this.url = API_URL + 'patient-statistics/';
  }

  /**
   * Obtiene las estadísticas generales.
   * @returns {Observable<any>} Observable con las estadísticas generales de la aplicación.
   */
  public getPatientOverallStats(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get(`${this.url}general/`, httpOptions);
  }

  /**
   * Obtiene las estadísticas de citas por especialidad y mes.
   * @param {number} year Año del que se quieren obtener las estadísticas.
   * @returns {Observable<any>} Observable con las estadísticas de citas por especialidad y mes.
   */
  public getPatientAppointmentsPerSpecialtyAndMonth(
    year: number
  ): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    const params = new HttpParams().set('year', String(year));

    return this._http.get(`${this.url}appointments-per-specialty-and-month/`, {
      params,
      ...httpOptions,
    });
  }
}
