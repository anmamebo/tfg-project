import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PdfService } from '@app/core/services/generics/pdf.service';
import { HttpCommonService } from '@app/core/services/http-common/http-common.service';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar la descarga e impresión de pdfs de tratamientos.
 */
@Injectable({
  providedIn: 'root',
})
export class PdfTreatmentService extends PdfService {
  /** Endpoint de la API. */
  public endpoint = 'treatments/';

  /** Endpoint de la API para la gestión de pdfs. */
  public entityEndpoint = 'pdf/';

  constructor(_http: HttpClient, _httpCommonService: HttpCommonService) {
    super(_http, _httpCommonService);
  }

  /**
   * Obtiene la URL del endpoint.
   * @returns {string} La URL del endpoint.
   */
  public getEndpoint(): string {
    return this.endpoint;
  }

  /**
   * Obtiene el pdf de una cita.
   * @param {string} id Id de la cita.
   * @returns {Observable<Blob>} Un observable que emite la respuesta del servidor.
   */
  public downloadTreatmentPdf(id: string): Observable<Blob> {
    return this.handlePdfAction(this.entityEndpoint, id, 'download');
  }

  /**
   * Imprime el pdf de una cita.
   * @param {string} id Id de la cita.
   * @returns {Observable<Blob>} Un observable que emite la respuesta del servidor.
   */
  public printTreatmentPdf(id: string): Observable<Blob> {
    return this.handlePdfAction(this.entityEndpoint, id, 'print');
  }
}
