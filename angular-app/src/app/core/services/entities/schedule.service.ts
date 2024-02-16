import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../constants/API-URL.constants';
import { ListResponse } from '../../models/response/list-response.interface';
import { MessageResponse } from '../../models/response/message-response.interface';
import { Schedule } from '../../models/schedule.interface';
import { HttpCommonService } from '../http-common/http-common.service';

/**
 * Servicio para interactuar con la API para la gestión de horarios.
 */
@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private _http: HttpClient,
    private __httpCommonService: HttpCommonService
  ) {
    this.url = API_URL + 'schedules/';
  }

  /**
   * Obtiene los horarios de un médico que no han sido asignados a citas.
   * @returns {Observable<ListResponse<Schedule>>} La lista de horarios.
   */
  public getNotAssignedSchedulesForDoctor(): Observable<
    ListResponse<Schedule>
  > {
    const headers = this.__httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<ListResponse<Schedule>>(
      `${this.url}doctor/not-assigned/`,
      httpOptions
    );
  }

  /**
   * Obtiene los horarios de un médico.
   * @param {string} doctorId - El ID del médico.
   * @returns {Observable<ListResponse<Schedule>>} La lista de horarios.
   */
  public getSchedulesForDoctor(
    doctorId: string
  ): Observable<ListResponse<Schedule>> {
    const headers = this.__httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = new HttpParams();
    params = params.set('doctor_id', doctorId);

    return this._http.get<ListResponse<Schedule>>(`${this.url}doctor/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Crea un horario.
   * @param {Schedule} schedule - El horario a crear.
   * @returns {Observable<MessageResponse>} La respuesta del servidor.
   */
  public createSchedule(schedule: Schedule): Observable<MessageResponse> {
    const headers = this.__httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(schedule);

    return this._http.post<MessageResponse>(this.url, params, httpOptions);
  }
}
