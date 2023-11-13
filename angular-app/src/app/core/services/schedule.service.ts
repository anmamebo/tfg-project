import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { HttpCommonService } from "./http-common.service";

import { API_URL } from '../constants/API_URL';

import { Schedule } from "../models/schedule.model";

/**
 * Servicio para interactuar con la API para la gestión de horarios.
 */
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  /**
   * URL base de la API para la gestión de horarios.
   */
  public url: string;

  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url;
  }

  public getScheduleByDoctor(): Observable<Schedule[]> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<Schedule[]>(this.url + 'schedules/schedules/get_by_doctor', httpOptions);
  }
}
