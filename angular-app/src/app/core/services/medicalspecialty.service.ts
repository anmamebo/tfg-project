import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../constants/API_URL';

// Servicios
import { HttpCommonService } from './http-common.service';

/**
 * Servicio para interactuar con la API para la gestión de especialidades médicas.
 */
@Injectable({
  providedIn: 'root',
})
export class MedicalspecialtyService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private _http: HttpClient,
    private _httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url + 'doctors/medicalspecialties/';
  }

  /**
   * Obtiene todas las especialidades médicas.
   * @returns Un observable que emite un objeto `any`.
   */
  getMedicalSpecialties(): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<any>(this.url, httpOptions);
  }
}
