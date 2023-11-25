import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Servicios
import { EntityService } from './entity.service';
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Doctor } from "../models/doctor.model";


/**
 * Servicio para interactuar con la API para la gestión de médicos.
 */
@Injectable({
  providedIn: 'root'
})
export class DoctorService extends EntityService<Doctor> {
  /** Endpoint de la API. */
  public endpoint = 'doctors/doctors/';

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
   * Obtiene un médico por su identificador.
   * @param id El identificador del médico.
   * @returns Un observable que emite un objeto `Doctor`.
   */
  public getDoctorById(id: number): Observable<Doctor> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<Doctor>(`${this.url}${this.endpoint}${id}/`, httpOptions);
  }

  /**
   * Obtiene todos los médicos.
   * @param page El número de página que se quiere obtener.
   * @param pageSize El tamaño de la página.
   * @param searchTerm Término de búsqueda.
   * @returns Un observable que emite un objeto `any`.
   */
  public getDoctors(page: number, pageSize: number, searchTerm: string): Observable<any> {
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
   * Crea un nuevo médico.
   * @param doctor El objeto `Doctor` con los datos del nuevo médico.
   * @returns Un observable que emite un objeto `any`.
   */
  public createDoctor(doctor: Doctor): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(doctor);

    return this.http.post<any>(`${this.url}${this.endpoint}`, params, httpOptions);
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

    return this.http.put<any>(`${this.url}${this.endpoint}${doctor.id}/`, params, httpOptions);
  }

  /**
   * Elimina un médico.
   * @param id El identificador del médico.
   * @returns Un observable que emite un objeto `any`.
   */
  public deleteDoctor(id: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.delete<any>(`${this.url}${this.endpoint}${id}/`, httpOptions);
  }

  /**
   * Activa un médico.
   * @param id El identificador del médico.
   * @returns Un observable que emite un objeto `any`.
   */
  public activateDoctor(id: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.put<any>(`${this.url}${this.endpoint}${id}/activate/`, {}, httpOptions);
  }

  /**
   * Obtiene listado de médicos de un departamento.
   * @param id ID del departamento.
   * @param page página actual.
   * @param pageSize tamaño de la página.
   * @returns Un observable que emite un objeto `any`.
   */
  public getDoctorsByDepartmentId(id: number, page: number, pageSize: number, searchTerm: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = new HttpParams().set('department', id.toString());
    params = params.set('page', page.toString());
    params = params.set('page_size', pageSize.toString());
    params = params.set('paginate', 'true');

    // Comprueba si se ha indicado un término de búsqueda
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.http.get<any>(`${this.url}${this.endpoint}doctors_by_department/`, { params, ...httpOptions });
  }
}
