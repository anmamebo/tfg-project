import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '@app/core/models/department.interface';
import { EntityService } from '@app/core/services/generics/entity.service';
import { HttpCommonService } from '@app/core/services/http-common/http-common.service';

/**
 * Servicio para interactuar con la API para la gestión de departamentos.
 */
@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends EntityService<Department> {
  /** Endpoint de la API. */
  public endpoint = 'departments/';

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
