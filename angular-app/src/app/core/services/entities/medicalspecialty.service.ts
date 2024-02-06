import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalSpecialty } from 'src/app/core/models/medical-specialty.interface';
import { EntityService } from 'src/app/core/services/generics/entity.service';
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

/**
 * Servicio para interactuar con la API para la gestión de especialidades médicas.
 */
@Injectable({
  providedIn: 'root',
})
export class MedicalspecialtyService extends EntityService<MedicalSpecialty> {
  /** URL del endpoint. */
  public endpoint = 'medicalspecialties/';

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
