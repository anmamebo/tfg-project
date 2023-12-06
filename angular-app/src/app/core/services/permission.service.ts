import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Servicios
import { EntityService } from './entity.service';
import { HttpCommonService } from './http-common.service';

// Modelos
import { Permission } from '../models/permission.model';

/**
 * Servicio para interactuar con la API para la gestión de permisos.
 */
@Injectable({
  providedIn: 'root',
})
export class PermissionService extends EntityService<Permission> {
  /** Endpoint de la API. */
  public endpoint = 'users/permissions/';

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
