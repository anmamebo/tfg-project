import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from 'src/app/core/constants/API_URL';

// Servicios
import { HttpCommonService } from 'src/app/core/services/http-common.service';

/**
 * Servicio genérico para entidades.
 */
@Injectable({
  providedIn: 'root',
})
export abstract class EntityService<T> {
  /** URL base de la API. */
  protected url: string;

  constructor(
    protected http: HttpClient,
    protected httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url;
  }

  /**
   * Obtiene el endpoint de la entidad.
   * @returns El endpoint de la entidad.
   */
  abstract getEndpoint(): string;

  /**
   * Obtiene el listado de elementos de la entidad.
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
    state: boolean | null = true,
    sortBy?: string,
    sortOrder?: string
  ): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders(); // Obtiene cabeceras comunes
    const httpOptions = { headers };

    let params = new HttpParams();

    if (paginated) {
      // Si se quiere paginar

      if (page) {
        // Si se ha indicado la página
        params = params.set('page', page.toString());
      }

      if (numResults) {
        // Si se ha indicado el número de resultados por página
        params = params.set('page_size', numResults.toString());
      }

      params = params.set('paginate', 'true'); // Indica que se quiere paginar
    }

    if (searchTerm) {
      // Si se ha indicado un término de búsqueda
      params = params.set('search', searchTerm);
    }

    if (state !== null && state !== undefined) {
      // Si se ha indicado un estado
      params = params.set('state', state.toString());
    }

    if (sortBy && sortOrder) {
      // Si se ha indicado un campo por el que ordenar
      params = params.set(
        'ordering',
        `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
      );
    }

    return this.http.get<any>(`${this.url}${this.getEndpoint()}`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene un elemento de la entidad.
   * @param id El identificador del elemento.
   * @returns Un observable que emite un objeto `any`.
   */
  public getItemById(id: string): Observable<T> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<any>(
      `${this.url}${this.getEndpoint()}${id}/`,
      httpOptions
    );
  }

  /**
   * Crea un elemento de la entidad.
   * @param item El objeto con los datos del elemento.
   * @returns Un observable que emite un objeto `any`.
   */
  public create(item: T): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(item);

    return this.http.post(
      `${this.url}${this.getEndpoint()}`,
      params,
      httpOptions
    );
  }

  /**
   * Actualiza un elemento de la entidad.
   * @param id El identificador del elemento.
   * @param item El objeto con los datos del elemento.
   * @returns Un observable que emite un objeto `any`.
   */
  public update(id: string, item: T): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(item);

    return this.http.put(
      `${this.url}${this.getEndpoint()}${id}/`,
      params,
      httpOptions
    );
  }

  /**
   * Elimina un elemento de la entidad.
   * @param id El identificador del elemento.
   * @returns Un observable que emite un objeto `any`.
   */
  public delete(id: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.delete(
      `${this.url}${this.getEndpoint()}${id}/`,
      httpOptions
    );
  }

  /**
   * Activa un elemento de la entidad.
   * @param id El identificador del elemento.
   * @returns Un observable que emite un objeto `any`.
   */
  public activate(id: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.put(
      `${this.url}${this.getEndpoint()}${id}/activate/`,
      {},
      httpOptions
    );
  }
}
