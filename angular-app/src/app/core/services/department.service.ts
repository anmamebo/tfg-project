import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

// Servicios
import { EntityService } from "./entity.service";
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Department } from "../models/department.model";


/**
 * Servicio para interactuar con la API para la gestión de departamentos.
 */
@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends EntityService<Department> {
  /** Endpoint de la API. */
  public endpoint = 'departments/departments/';

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
   * Obtiene un departamento por su identificador.
   * @param id El identificador del departamento.
   * @returns Un observable que emite un objeto `Department`.
   */
  public getDepartmentById(id: number): Observable<Department> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<Department>(`${this.url}${this.endpoint}${id}/`, httpOptions);
  }

  /**
   * Obtiene todos los departamentos.
   * @returns Un observable que emite un objeto `any`.
   */
  public getDepartments(): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<any>(this.url, httpOptions);
  }

  /**
   * Obtiene los departamentos paginados.
   * @param page Pagina actual.
   * @param pageSize Tamaño de la pagina.
   * @param searchTerm Termino de busqueda.
   * @returns Un observable que emite un objeto `any`.
   */
  public getDepartmentsPaginate(page: number, pageSize: number, searchTerm: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    // Parámetros de la petición
    let params = new HttpParams().set('page', page.toString());
    params = params.set('page_size', pageSize.toString());
    params = params.set('paginate', 'true');

    // Comprueba si se ha indicado un término de búsqueda
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.http.get<any>(`${this.url}${this.endpoint}`, { params, ...httpOptions });
  }

  /**
   * Crea un nuevo departamento.
   * @param department El objeto `Department` con los datos del nuevo departamento.
   * @returns Un observable que emite un objeto `any`.
   */
  public createDepartment(department: Department): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(department);

    return this.http.post<any>(`${this.url}${this.endpoint}`, params, httpOptions);
  }

  /**
   * Actualiza los datos de un departamento.
   * @param department El objeto `Department` con los datos actualizados.
   * @returns Un observable que emite un objeto `any`.
   */
  public updateDepartment(department: Department): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(department);

    return this.http.put<any>(`${this.url}${this.endpoint}${department.id}/`, params, httpOptions);
  }

  /**
   * Elimina un departamento.
   * @param id El identificador del departamento.
   * @returns Un observable que emite un objeto `any`.
   */
  public deleteDepartment(id: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.delete<any>(`${this.url}${this.endpoint}${id}/`, httpOptions);
  }

  /**
   * Activa un departamento.
   * @param id El identificador del departamento.
   * @returns Un observable que emite un objeto `any`.
   */
  public activateDepartment(id: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.patch<any>(`${this.url}${this.endpoint}${id}/activate/`, {}, httpOptions);
  }
}
