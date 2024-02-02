import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { API_URL } from 'src/app/core/constants/API_URL';

// Servicios
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

// Modelos
import { MedicalTest } from 'src/app/core/models/medical-test.interface';

interface MedicalTestOptions {
  page?: number;
  numResults?: number;
  searchTerm?: string;
  paginate?: boolean;
  sortBy?: string;
  sortOrder?: string;
  completed?: 'true' | 'false';
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Servicio para interactuar con la API para la gestión de pruebas médicas.
 */
@Injectable({
  providedIn: 'root',
})
export class MedicalTestService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private _http: HttpClient,
    private _httpCommonService: HttpCommonService
  ) {
    this.url = API_URL.url + 'medicaltests/';
  }

  /**
   * Construye y retorna los parámetros para las peticiones HTTP.
   * @param {MedicalTestOptions} options - Opciones para construir los parámetros HTTP.
   * @returns {HttpParams} Los parámetros HTTP construidos para la consulta.
   */
  private _buildParams(options: MedicalTestOptions = {}): HttpParams {
    const {
      page,
      numResults,
      searchTerm,
      paginate = false,
      sortBy,
      sortOrder,
      completed,
      dateFrom,
      dateTo,
    } = options;

    let params = new HttpParams();

    console.log(completed);

    if (completed) {
      params = params.set('completed', completed);
    }

    if (dateFrom) {
      params = params.set('date_prescribed__gte', dateFrom);
    }

    if (dateTo) {
      params = params.set('date_prescribed__lte', dateTo);
    }

    if (paginate) {
      if (page) {
        params = params.set('page', page.toString());
      }

      if (numResults) {
        params = params.set('page_size', numResults.toString());
      }

      params = params.set('paginate', 'true'); // Indica que se quiere paginar
    }

    if (searchTerm) {
      // Si se ha indicado un término de búsqueda
      params = params.set('search', searchTerm);
    }

    if (sortBy && sortOrder) {
      // Si se ha indicado un campo por el que ordenar
      params = params.set(
        'ordering',
        `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
      );
    }

    return params;
  }

  /**
   * Obtiene todas las pruebas médicas de una cita.
   * @param {string} appointmentId ID de la cita.
   * @param {MedicalTestOptions} options Opciones para filtrar las pruebas médicas.
   * @returns {Observable<any>} Un observable que emite un objeto `any`.
   */
  public getMedicalTestsByAppointment(
    appointmentId: string,
    options: MedicalTestOptions = {}
  ): Observable<any> {
    let params = this._buildParams(options);
    params = params.set('appointment_id', appointmentId);

    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<any>(`${this.url}appointment/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene todas las pruebas médicas de un paciente.
   * @param {MedicalTestOptions} options Opciones para filtrar las pruebas médicas.
   * @param {string | null} patientId ID del paciente.
   * @returns {Observable<any>} Un observable que emite un objeto `any`.
   */
  public getMedicalTestsByPatient(
    options: MedicalTestOptions = {},
    patientId: string | null = null
  ): Observable<any> {
    let params = this._buildParams(options);
    if (patientId) {
      params = params.set('patient_id', patientId);
    }

    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<any>(`${this.url}patient/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene una prueba médica por su ID.
   * @param {string} id - El ID de la prueba médica.
   * @returns {Observable<any>} Un observable que emite un objeto `any`.
   */
  public getMedicalTestById(id: string): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<any>(`${this.url}${id}/`, httpOptions);
  }

  /**
   * Crea una prueba médica.
   * @param {MedicalTest} medicalTest - Datos de la prueba médica.
   * @returns {Observable<any>} Un observable que emite un objeto `any`.
   */
  public createMedicalTest(medicalTest: MedicalTest): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(medicalTest);

    return this._http.post<any>(`${this.url}`, params, httpOptions);
  }

  /**
   * Actualiza una prueba médica.
   * @param {string} id - ID de la prueba médica.
   * @param {any} medicalTest - Datos de la prueba médica.
   * @returns {Observable<any>} Un observable que emite un objeto `any`.
   */
  public updateMedicalTest(id: string, medicalTest: any): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(medicalTest);

    return this._http.put<any>(`${this.url}${id}/`, params, httpOptions);
  }

  /**
   * Gestiona la descarga de un fichero adjunto de una prueba médica.
   * @param {string} attachmentId ID del fichero adjunto.
   * @returns {Observable<Blob>} El archivo adjunto.
   */
  public downloadMedicalTestAttachment(attachmentId: string): Observable<Blob> {
    const headers = this._httpCommonService.getCommonHeaders();

    return this._http
      .get(`${this.url}${attachmentId}/download-attachment/`, {
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
   * Sube un fichero adjunto a una prueba médica.
   * @param {any} attachment Fichero adjunto.
   * @returns {Observable<any>} Un observable que emite un objeto `any`.
   */
  public uploadMedicalTestAttachment(attachment: any): Observable<any> {
    let headers = this._httpCommonService.getCommonHeaders();
    headers = headers.delete('Content-Type');
    const httpOptions = { headers };

    let formData = new FormData();
    formData.append('file', attachment.file);
    formData.append('name', attachment.name);
    if (attachment.description) {
      formData.append('description', attachment.description);
    }
    formData.append('medical_test', attachment.medical_test);

    return this._http.post<any>(
      `${this.url}upload-attachment/`,
      formData,
      httpOptions
    );
  }

  /**
   * Elimina un fichero adjunto de una prueba médica.
   * @param {string} attachmentId ID del fichero adjunto.
   * @returns {Observable<any>} Un observable que emite un objeto `any`.
   */
  public deleteMedicalTestAttachment(attachmentId: string): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.delete<any>(
      `${this.url}${attachmentId}/delete-attachment/`,
      httpOptions
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
}
