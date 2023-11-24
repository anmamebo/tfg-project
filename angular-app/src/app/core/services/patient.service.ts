import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Servicios
import { EntityService } from './entity.service';
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Patient } from '../models/patient.model';


/**
 * Servicio para interactuar con la API para la gestión de pacientes.
 */
@Injectable({
  providedIn: 'root'
})
export class PatientService extends EntityService<Patient> {
  /** Endpoint de la API. */
  public endpoint = 'patients/patients/';

  constructor(
    http: HttpClient,
    httpCommonService: HttpCommonService,
  ) {
    super(http, httpCommonService);
  }

  /**
   * Obtiene la URL del endpoint.
   * @returns La URL del endpoint.
   */
  public getEndpoint(): string {
    return this.endpoint;
  }

  /**
   * Obtiene un paciente por su identificador.
   * @param patient El identificador del paciente.
   * @returns Un observable que emite un objeto `Patient`.
   */
  public getPatientById(id: number): Observable<Patient> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<Patient>(`${this.url}${this.endpoint}${id}/`, httpOptions);
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

    return this.http.get<any>(`${this.url}${this.endpoint}`, { params, ...httpOptions });
  }

  /**
   * Crea un paciente.
   * @param patient El objeto `Patient` con los datos del paciente.
   * @returns Un observable que emite un objeto `any`.
   */
  public createPatient(patient: Patient): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(patient);

    return this.http.post<any>(`${this.url}${this.endpoint}`, params, httpOptions);
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

    return this.http.put<any>(`${this.url}${this.endpoint}${patient.id}/`, params, httpOptions);
  }

  /**
   * Elimina un paciente.
   * @param id El identificador del paciente.
   * @returns Un observable que emite un objeto `any`.
   */
  public deletePatient(id: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.delete<any>(`${this.url}${this.endpoint}${id}/`, httpOptions);
  }

  /**
   * Activa un paciente.
   * @param id El identificador del paciente.
   * @returns Un observable que emite un objeto `any`.
   */
  public activatePatient(id: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.put<any>(`${this.url}${this.endpoint}${id}/activate/`, {}, httpOptions);
  }
}
