import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/core/constants/API-URL.constants';
import { ListResponse } from 'src/app/core/models/response/list-response.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

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
    this.url = API_URL;
  }

  /**
   * Obtiene el endpoint de la entidad.
   * @returns {string} El endpoint de la entidad.
   */
  abstract getEndpoint(): string;

  /**
   * Obtiene el lista de elementos de la entidad.
   * @param options Opciones de la petición.
   * @returns {Observable<ListResponse<T>>} Un observable que emite un objeto `ListResponse<T>`.
   */
  public getItems(
    options: {
      page?: number;
      numResults?: number;
      searchTerm?: string;
      paginated?: boolean;
      state?: boolean | null;
      sortBy?: string;
      sortOrder?: string;
    } = {}
  ): Observable<ListResponse<T>> {
    const {
      page,
      numResults,
      searchTerm,
      paginated = false,
      state = true,
      sortBy,
      sortOrder,
    } = options;

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

    return this.http.get<ListResponse<T>>(`${this.url}${this.getEndpoint()}`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene un elemento de la entidad.
   * @param {string} id El identificador del elemento.
   * @returns {Observable<T>} Un observable que emite un objeto `T`.
   */
  public getItemById(id: string): Observable<T> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<T>(
      `${this.url}${this.getEndpoint()}${id}/`,
      httpOptions
    );
  }

  /**
   * Crea un elemento de la entidad.
   * @param {T} item El objeto con los datos del elemento.
   * @returns {Observable<MessageResponse>} Un observable que emite un objeto `MessageResponse`.
   */
  public create(item: T): Observable<MessageResponse> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(item);

    return this.http.post<MessageResponse>(
      `${this.url}${this.getEndpoint()}`,
      params,
      httpOptions
    );
  }

  /**
   * Actualiza un elemento de la entidad.
   * @param {string} id El identificador del elemento.
   * @param {T} item El objeto con los datos del elemento.
   * @returns {Observable<MessageResponse>} Un observable que emite un objeto `MessageResponse`.
   */
  public update(id: string, item: T): Observable<MessageResponse> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(item);

    return this.http.put<MessageResponse>(
      `${this.url}${this.getEndpoint()}${id}/`,
      params,
      httpOptions
    );
  }

  /**
   * Elimina un elemento de la entidad.
   * @param {string} id El identificador del elemento.
   * @returns {Observable<MessageResponse>} Un observable que emite un objeto `MessageResponse`.
   */
  public delete(id: string): Observable<MessageResponse> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.delete<MessageResponse>(
      `${this.url}${this.getEndpoint()}${id}/`,
      httpOptions
    );
  }

  /**
   * Activa un elemento de la entidad.
   * @param {string} id El identificador del elemento.
   * @returns {Observable<MessageResponse>} Un observable que emite un objeto `MessageResponse`.
   */
  public activate(id: string): Observable<MessageResponse> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.put<MessageResponse>(
      `${this.url}${this.getEndpoint()}${id}/activate/`,
      {},
      httpOptions
    );
  }
}
