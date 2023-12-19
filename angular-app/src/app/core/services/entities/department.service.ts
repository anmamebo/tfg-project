import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Servicios
import { EntityService } from '../generics/entity.service';
import { HttpCommonService } from '../http-common/http-common.service';

// Modelos
import { Department } from '../../models/department.model';

/**
 * Servicio para interactuar con la API para la gestión de departamentos.
 */
@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends EntityService<Department> {
  /** Endpoint de la API. */
  public endpoint = 'departments/departments/';

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
