import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Servicios
import { EntityService } from './entity.service';
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Patient } from '../models/patient.model';


/**
 * Servicio para interactuar con la API para la gestión de pacientes.
 */
@Injectable({
  providedIn: 'root'
})
export class PatientService extends EntityService<Patient> {
  /** Endpoint de la API. */
  public endpoint = 'patients/patients/';

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
}
