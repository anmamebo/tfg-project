import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { HttpCommonService } from "./http-common.service";

import { API_URL } from '../constants/API_URL';

import { Doctor } from "../models/doctor.model";

/**
 * Servicio para interactuar con la API para la gestión de médicos.
 */
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  /**
   * URL base de la API para la gestión de médicos.
   */
  public url: string;

  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService,
  ) {
    this.url = API_URL.url;
  }

  /**
   * Actualiza los datos de un médico.
   * @param doctor El objeto `Doctor` con los datos actualizados.
   * @returns Un observable que emite un objeto `any`.
   */
  public updateDoctor(doctor: Doctor): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(doctor);

    return this.http.put<any>(this.url + 'doctors/doctors/' + doctor.id + '/', params, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            let errorMessage = error.error.message;
            throw new Error(errorMessage);
          }
          throw new Error('Ocurrió un error en el servidor. Inténtalo más tarde.');
        })
      );
  }
}
