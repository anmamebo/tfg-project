import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Servicios
import { EntityService } from './entity.service';
import { HttpCommonService } from './http-common.service';

// Modelos
import { Group } from '../models/group.model';

/**
 * Servicio para interactuar con la API para la gestión de grupos.
 */
@Injectable({
  providedIn: 'root',
})
export class GroupService extends EntityService<Group> {
  /** Endpoint de la API. */
  public endpoint = 'users/groups/';

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
}
