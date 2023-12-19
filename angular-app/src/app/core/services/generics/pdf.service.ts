import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { API_URL } from 'src/app/core/constants/API_URL';

// Servicios
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

/**
 * Servicio genérico para la descarga de archivos PDF.
 */
@Injectable({
  providedIn: 'root',
})
export abstract class PdfService {
  /** URL base de la API. */
  protected url: string;

  constructor(
    protected http: HttpClient,
    protected httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url;
  }

  /**
   * Obtiene el endpoint de la entidad.
   * @returns El endpoint de la entidad.
   */
  abstract getEndpoint(): string;

  /**
   * Gestiona la descarga o impresión de un archivo PDF.
   * @param entityEndpoint Endpoint de la entidad.
   * @param id ID de la entidad.
   * @param action Acción a realizar.
   * @returns El archivo PDF.
   */
  protected handlePdfAction(
    entityEndpoint: string,
    id: string,
    action: 'download' | 'print'
  ): Observable<Blob> {
    const headers = this.httpCommonService.getCommonHeaders();

    return this.http
      .get(`${this.url}${this.getEndpoint()}${id}/${entityEndpoint}`, {
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

            if (action === 'download') {
              this._downloadFile(response.body, fileName);
            } else if (action === 'print') {
              this._printFile(response.body, fileName);
            }
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
