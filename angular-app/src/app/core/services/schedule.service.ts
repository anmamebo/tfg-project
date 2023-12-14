import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../constants/API_URL';

// Servicios
import { HttpCommonService } from './http-common.service';

// Modelos
import { Schedule } from '../models/schedule.model';

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
    private _httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url + 'schedules/schedules/';
  }

  /**
   * Obtiene un horario para un médico.
   * @returns Un observable que emite un objeto `Schedule`.
   */
  public getScheduleByDoctor(): Observable<Schedule[]> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<Schedule[]>(this.url + 'get_by_doctor', httpOptions);
  }
}
