import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Servicios
import { EntityService } from '../generics/entity.service';
import { HttpCommonService } from '../http-common/http-common.service';

// Modelos
import { Room } from '../../models/room.model';

/**
 * Servicio para interactuar con la API para la gestión de salas.
 */
@Injectable({
  providedIn: 'root',
})
export class RoomService extends EntityService<Room> {
  /** Endpoint de la API. */
  public endpoint = 'departments/rooms/';

  constructor(http: HttpClient, httpCommonService: HttpCommonService) {
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
   * Obtiene listado de salas de un departamento.
   * @param id ID del departamento.
   * @param page página actual.
   * @param pageSize tamaño de la página.
   * @returns Un observable que emite un objeto `any`.
   */
  public getRoomsByDepartmentId(
    id: string,
    page: number,
    pageSize: number,
    searchTerm: string
  ): Observable<any> {
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

    return this.http.get<any>(
      `${this.url}${this.endpoint}rooms_by_department`,
      { params, ...httpOptions }
    );
  }
}
