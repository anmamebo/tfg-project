import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@app/core/constants/API-URL.constants';
import { HttpCommonService } from '@app/core/services/http-common/http-common.service';
import { Observable, map } from 'rxjs';

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
    this.url = API_URL;
  }

  /**
   * Obtiene el endpoint de la entidad.
   * @returns {string} El endpoint de la entidad.
   */
  abstract getEndpoint(): string;

  /**
   * Gestiona la descarga o impresión de un archivo PDF.
   * @param {string} entityEndpoint Endpoint de la entidad.
   * @param {string} id ID de la entidad.
   * @param {'download' | 'print'} action Acción a realizar.
   * @returns {Observable<Blob>} El archivo PDF.
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
   * @param {Blob} blob Archivo.
   * @param {string} fileName Nombre del archivo.
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
   * @param {Blob} blob Archivo.
   * @param {string} fileName Nombre del archivo.
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
