import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_URL } from '../constants/API_URL';

// Servicios
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Department } from "../models/department.model";


/**
 * Servicio para interactuar con la API para la gestión de departamentos.
 */
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService,
  ) {
    this.url = API_URL.url + 'departments/departments/';
  }

  /**
   * Obtiene un departamento por su identificador.
   * @param id El identificador del departamento.
   * @returns Un observable que emite un objeto `Department`.
   */
  public getDepartmentById(id: number): Observable<Department> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<Department>(this.url + id + '/', httpOptions);
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

    // Comprueba si se ha indicado un término de búsqueda
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.http.get<any>(this.url + 'list_paginate/', { params, ...httpOptions });
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

    return this.http.post<any>(this.url, params, httpOptions);
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

    return this.http.put<any>(this.url + department.id + '/', params, httpOptions);
  }

  /**
   * Elimina un departamento.
   * @param id El identificador del departamento.
   * @returns Un observable que emite un objeto `any`.
   */
  public deleteDepartment(id: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.delete<any>(this.url + id + '/', httpOptions);
  }

  /**
   * Activa un departamento.
   * @param id El identificador del departamento.
   * @returns Un observable que emite un objeto `any`.
   */
  public activateDepartment(id: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.patch<any>(this.url + id + '/activate/', {}, httpOptions);
  }
}
