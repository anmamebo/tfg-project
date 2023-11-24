import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_URL } from 'src/app/core/constants/API_URL';

// Servicios
import { HttpCommonService } from "src/app/core/services/http-common.service";


/**
 * Servicio genérico para obtener listados.
 */
@Injectable({
  providedIn: 'root'
})
export abstract class ListService<T> {
  /** URL base de la API. */
  protected url: string;

  constructor(
    protected http: HttpClient,
    protected httpCommonService: HttpCommonService,
  ) {
    this.url = API_URL.url;
  }

  /**
   * Obtiene los elementos de la entidad.
   * 
   * @param page Número de página.
   * @param numResults Número de resultados por página.
   * @param searchTerm Término de búsqueda.
   * @param paginated Indica si se quiere paginar.
   * @returns Observable con los elementos de la entidad.
   */
  public getItems(
    page?: number,
    numResults?: number,
    searchTerm?: string,
    paginated: boolean = false,
  ): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders(); // Obtiene cabeceras comunes
    const httpOptions = { headers };
    
    let params = new HttpParams();
    
    if (paginated) { // Si se quiere paginar

      if (page) { // Si se ha indicado la página
        params = params.set('page', page.toString());
      }

      if (numResults) { // Si se ha indicado el número de resultados por página
        params = params.set('page_size', numResults.toString());
      }

      params = params.set('paginate', 'true'); // Indica que se quiere paginar

    }

    if (searchTerm) { // Si se ha indicado un término de búsqueda
      params = params.set('search', searchTerm);
    }

    return this.http.get<any>(`${this.url}${this.getEndpoint()}`, { params, ...httpOptions });
  }

  /**
   * Obtiene el endpoint de la entidad.
   * @returns Endpoint de la entidad.
   */
  abstract getEndpoint(): string;
}
