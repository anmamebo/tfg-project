import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Servicios
import { EntityService } from 'src/app/core/services/generics/entity.service';
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

// Modelos
import { Group } from 'src/app/core/models/group.interface';

/**
 * Servicio para interactuar con la API para la gestión de grupos.
 */
@Injectable({
  providedIn: 'root',
})
export class GroupService extends EntityService<Group> {
  /** Endpoint de la API. */
  public endpoint = 'groups/groups/';

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
}
