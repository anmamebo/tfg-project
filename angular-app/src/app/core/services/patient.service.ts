import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { API_URL } from '../constants/API_URL';

// Servicios
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Patient } from '../models/patient.model';


/**
 * Servicio para interactuar con la API para la gestión de pacientes.
 */
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService,
  ) {
    this.url = API_URL.url + 'patients/patients/';
  }

  /**
   * Obtiene un paciente por su identificador.
   * @param patient El identificador del paciente.
   * @returns Un observable que emite un objeto `Patient`.
   */
  public getPatientById(id: number): Observable<Patient> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<Patient>(this.url + id + '/', httpOptions);
  }

  /**
   * Obtiene todos los pacientes.
   * @param page El número de página que se quiere obtener.
   * @param searchTerm Término de búsqueda.
   * @returns Un observable que emite un objeto `any`.
   */
  public getPatients(page: number, pageSize: number, searchTerm: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    // Parámetros de la petición
    let params = new HttpParams().set('page', page.toString());
    params = params.set('page_size', pageSize.toString());

    // Comprueba si se ha indicado un término de búsqueda
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.http.get<any>(this.url, { params, ...httpOptions });
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

    return this.http.put<any>(this.url + patient.id + '/', params, httpOptions);
  }
}
