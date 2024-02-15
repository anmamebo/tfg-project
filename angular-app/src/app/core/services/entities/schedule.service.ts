import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../constants/API-URL.constants';
import { ListResponse } from '../../models/response/list-response.interface';
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
}
