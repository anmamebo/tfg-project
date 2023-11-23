import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_URL } from '../constants/API_URL';

// Servicios
import { HttpCommonService } from "./http-common.service";

// Modelos
import { MedicalSpecialty } from "../models/medical-specialty.model";


/**
 * Servicio para interactuar con la API para la gestión de especialidades médicas.
 */
@Injectable({
  providedIn: 'root'
})
export class MedicalspecialtyService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService,
  ) {
    this.url = API_URL.url + 'doctors/medicalspecialties/';
  }

  /**
   * Obtiene todas las especialidades médicas.
   * @returns Un observable que emite un objeto `any`.
   */
  getMedicalSpecialties(): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<any>(this.url, httpOptions);
  }
}
