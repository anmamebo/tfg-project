import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

// Servicios
import { EntityService } from './entity.service';
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Room } from "../models/room.model";


/**
 * Servicio para interactuar con la API para la gestión de salas.
 */
@Injectable({
  providedIn: 'root'
})
export class RoomService extends EntityService<Room> {
  /** Endpoint de la API. */
  public endpoint = 'departments/rooms/';

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
   * Obtiene una sala por su identificador.
   * @param id El identificador de la sala.
   * @returns Un observable que emite un objeto `Room`.
   */
  public getRoomById(id: number): Observable<Room> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.get<Room>(`${this.url}${this.endpoint}${id}/`, httpOptions);
  }
  
  /**
   * Obtiene listado de salas de un departamento.
   * @param id ID del departamento.
   * @param page página actual.
   * @param pageSize tamaño de la página.
   * @returns Un observable que emite un objeto `any`.
   */
  public getRoomsByDepartmentId(id: number, page: number, pageSize:number, searchTerm: string): Observable<any> {
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

    return this.http.get<any>(`${this.url}${this.endpoint}rooms_by_department`, { params, ...httpOptions });
  }

  /**
   * Crea una sala.
   * @param room El objeto `Room` con los datos a crear.
   * @returns Un observable que emite un objeto `any`.
   */
  public createRoom(room: Room): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(room);

    return this.http.post(`${this.url}${this.endpoint}`, params, httpOptions);
  }

  /**
   * Actualiza una sala.
   * @param room El objeto `Room` con los datos actualizados.
   * @returns Un observable que emite un objeto `any`.
   */
  public updateRoom(room: Room): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(room);

    return this.http.put(`${this.url}${this.endpoint}${room.id}/`, params, httpOptions);
  }

  /**
   * Elimina una sala.
   * @param id El identificador de la sala.
   * @returns Un observable que emite un objeto `any`.
   */
  public deleteRoom(id: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.delete(`${this.url}${this.endpoint}${id}/`, httpOptions);
  }

  /**
   * Activa una sala.
   * @param id El identificador de la sala.
   * @returns Un observable que emite un objeto `any`.
   */
  public activateRoom(id: string): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this.http.put(`${this.url}${this.endpoint}${id}/activate/`, {}, httpOptions);
  }
}
