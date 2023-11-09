import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { HttpCommonService } from "./http-common.service";

import { API_URL } from '../constants/API_URL';

import { Patient } from '../models/patient.model';


/**
 * Servicio para interactuar con la API para la gestión de pacientes.
 */
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  /**
   * URL base de la API para la gestión de pacientes.
   */
  public url: string;

  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService,
  ) {
    this.url = API_URL.url;
  }

  /**
   * Actualiza los datos de un paciente.
   * @param patient El objeto `Patient` con los datos actualizados.
   * @returns Un observable que emite un objeto `any`.
   */
  public updatePatient(patient: Patient): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(patient);

    return this.http.put<any>(this.url + 'patients/' + patient.id + '/', params, httpOptions)
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
