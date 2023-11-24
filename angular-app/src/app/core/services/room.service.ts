import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_URL } from '../constants/API_URL';

// Servicios
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Room } from "../models/room.model";


/**
 * Servicio para interactuar con la API para la gestión de salas.
 */
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService,
  ) {
    this.url = API_URL.url + 'departments/rooms/';
  }

  /**
   * Obtiene listado de salas de un departamento.
   * @param id ID del departamento.
   * @param page página actual.
   * @param pageSize tamaño de la página.
   * @returns Un observable que emite un objeto `any`.
   */
  public getRoomsByDepartmentId(id: number, page: number, pageSize:number): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = new HttpParams().set('department', id.toString());
    params = params.set('page', page.toString());
    params = params.set('page_size', pageSize.toString());
    params = params.set('paginate', 'true');    

    return this.http.get<any>(this.url + 'rooms_by_department', { params, ...httpOptions });
  }
}
