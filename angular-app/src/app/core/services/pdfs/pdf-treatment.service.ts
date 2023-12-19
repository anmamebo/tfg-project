import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { API_URL } from '../../constants/API_URL';

// Servicios
import { HttpCommonService } from '../http-common/http-common.service';

/**
 * Servicio para gestionar la descarga e impresión de pdfs de tratamientos.
 */
@Injectable({
  providedIn: 'root',
})
export class PdfTreatmentService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private _http: HttpClient,
    private _httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url + 'treatments/treatments/';
  }

  /**
   * Obtiene el pdf de una cita.
   * @param id Id de la cita.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public downloadPdf(id: string): Observable<Blob> {
    const headers = this._httpCommonService.getCommonHeaders();

    return this._http
      .get(`${this.url}${id}/get_treatment_pdf/`, {
        headers,
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Blob> | null) => {
          if (!response || !response.body) {
            throw new Error('No se ha podido descargar el archivo');
          }
          const contentDisposition = response.headers.get(
            'Content-Disposition'
          );

          const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);

          if (fileNameMatch && fileNameMatch.length > 1) {
            const fileName = fileNameMatch[1];

            this._downloadFile(response.body, fileName);
          }
          return response.body as Blob;
        })
      );
  }

  /**
   * Imprime el pdf de una cita.
   * @param id Id de la cita.
   * @returns Un observable que emite la respuesta del servidor.
   */
  public printPdf(id: string): Observable<Blob> {
    const headers = this._httpCommonService.getCommonHeaders();

    return this._http
      .get(`${this.url}${id}/get_treatment_pdf/`, {
        headers,
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Blob> | null) => {
          if (!response || !response.body) {
            throw new Error('No se ha podido descargar el archivo');
          }
          const contentDisposition = response.headers.get(
            'Content-Disposition'
          );

          const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);

          if (fileNameMatch && fileNameMatch.length > 1) {
            const fileName = fileNameMatch[1];

            this._printFile(response.body, fileName);
          }
          return response.body as Blob;
        })
      );
  }

  /**
   * Descarga un archivo.
   * @param blob Archivo.
   * @param fileName Nombre del archivo.
   */
  private _downloadFile(blob: Blob, fileName: string): void {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  /**
   * Imprime un archivo.
   * @param blob Archivo.
   * @param fileName Nombre del archivo.
   */
  private _printFile(blob: Blob, fileName: string): void {
    const fileURL = window.URL.createObjectURL(blob);
    const printWindow = window.open(fileURL, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  }
}
