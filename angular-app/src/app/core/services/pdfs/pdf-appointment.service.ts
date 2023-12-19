import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Servicios
import { HttpCommonService } from '../http-common/http-common.service';
import { PdfService } from 'src/app/core/services/generics/pdf.service';

/**
 * Servicio para gestionar la descarga e impresión de pdfs de citas.
 */
@Injectable({
  providedIn: 'root',
})
export class PdfAppointmentService extends PdfService {
  /** Endpoint de la API. */
  public endpoint = 'appointments/appointments/';

  public entityEndpoint = 'get_appointment_pdf/';

  constructor(_http: HttpClient, _httpCommonService: HttpCommonService) {
    super(_http, _httpCommonService);
  }

  /**
   * Obtiene la URL del endpoint.
   * @returns La URL del endpoint.
   */
  public getEndpoint(): string {
    return this.endpoint;
  }

  /**
   * Obtiene el pdf de una cita.
   * @param id Id de la cita.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public downloadAppointmentPdf(id: string): Observable<Blob> {
    return this.handlePdfAction(this.entityEndpoint, id, 'download');
  }

  /**
   * Imprime el pdf de una cita.
   * @param id Id de la cita.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public printAppointmentPdf(id: string): Observable<Blob> {
    return this.handlePdfAction(this.entityEndpoint, id, 'print');
  }
}
