import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/core/models/response/list-response.interface';
import { Room } from 'src/app/core/models/room.interface';
import { EntityService } from 'src/app/core/services/generics/entity.service';
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

interface RoomOptions {
  paginate?: boolean;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}

/**
 * Servicio para interactuar con la API para la gestión de salas.
 */
@Injectable({
  providedIn: 'root',
})
export class RoomService extends EntityService<Room> {
  /** Endpoint de la API. */
  public endpoint = 'rooms/';

  constructor(http: HttpClient, httpCommonService: HttpCommonService) {
    super(http, httpCommonService);
  }

  /**
   * Obtiene la URL del endpoint.
   * @returns {string} La URL del endpoint.
   */
  public getEndpoint(): string {
    return this.endpoint;
  }

  /**
   * Construye y retorna los parámetros para las peticiones HTTP.
   * @param {DoctorOptions} options - Opciones para construir los parámetros HTTP.
   * @returns {HttpParams} Los parámetros HTTP construidos para la consulta.
   */
  private _buildParams(options: RoomOptions = {}): HttpParams {
    const { paginate = false, page, pageSize, searchTerm } = options;

    let params = new HttpParams();

    if (paginate) {
      // Si se quiere paginar

      if (page) {
        // Si se ha indicado la página
        params = params.set('page', page.toString());
      }

      if (pageSize) {
        // Si se ha indicado el número de resultados por página
        params = params.set('page_size', pageSize.toString());
      }

      params = params.set('paginate', 'true'); // Indica que se quiere paginar
    }

    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return params;
  }

  /**
   * Obtiene listado de salas de un departamento.
   * @param {string} departmentId ID del departamento.
   * @param {RoomOptions} options - Opciones para filtrar los resultados.
   * @returns {Observable<ListResponse<Room>>} Un observable que emite un objeto la respuesta del servidor.
   */
  public getRoomsByDepartmentId(
    departmentId: string,
    options: RoomOptions = {}
  ): Observable<ListResponse<Room>> {
    let params = this._buildParams(options);
    params = params.set('department', departmentId);

    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<ListResponse<Room>>(
      `${this.url}${this.endpoint}department`,
      {
        params,
        ...httpOptions,
      }
    );
  }
}
