import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@app/core/constants/API-URL.constants';
import {
  MedicalTest,
  MedicalTestAttachment,
} from '@app/core/models/medical-test.interface';
import { ListResponse } from '@app/core/models/response/list-response.interface';
import { MessageResponse } from '@app/core/models/response/message-response.interface';
import { HttpCommonService } from '@app/core/services/http-common/http-common.service';
import { Observable, map } from 'rxjs';

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
    this.url = API_URL + 'medicaltests/';
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
   * @returns {Observable<ListResponse<MedicalTest>>} Un observable que emite un objeto `ListResponse<MedicalTest>`.
   */
  public getMedicalTestsByAppointment(
    appointmentId: string,
    options: MedicalTestOptions = {}
  ): Observable<ListResponse<MedicalTest>> {
    let params = this._buildParams(options);
    params = params.set('appointment_id', appointmentId);

    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<ListResponse<MedicalTest>>(
      `${this.url}appointment/`,
      {
        params,
        ...httpOptions,
      }
    );
  }

  /**
   * Obtiene todas las pruebas médicas de un paciente.
   * @param {MedicalTestOptions} options Opciones para filtrar las pruebas médicas.
   * @param {string | null} patientId ID del paciente.
   * @returns {Observable<ListResponse<MedicalTest>>} Un observable que emite un objeto `ListResponse<MedicalTest>`.
   */
  public getMedicalTestsByPatient(
    options: MedicalTestOptions = {},
    patientId: string | null = null
  ): Observable<ListResponse<MedicalTest>> {
    let params = this._buildParams(options);
    if (patientId) {
      params = params.set('patient_id', patientId);
    }

    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<ListResponse<MedicalTest>>(`${this.url}patient/`, {
      params,
      ...httpOptions,
    });
  }

  /**
   * Obtiene una prueba médica por su ID.
   * @param {string} id - El ID de la prueba médica.
   * @returns {Observable<MedicalTest>} Un observable que emite un objeto `MedicalTest`.
   */
  public getMedicalTestById(id: string): Observable<MedicalTest> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.get<MedicalTest>(`${this.url}${id}/`, httpOptions);
  }

  /**
   * Crea una prueba médica.
   * @param {MedicalTest} medicalTest - Datos de la prueba médica.
   * @returns {Observable<MessageResponse>} Un observable que emite un objeto `MessageResponse`.
   */
  public createMedicalTest(
    medicalTest: MedicalTest
  ): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(medicalTest);

    return this._http.post<MessageResponse>(`${this.url}`, params, httpOptions);
  }

  /**
   * Actualiza una prueba médica.
   * @param {string} id - ID de la prueba médica.
   * @param {MedicalTest} medicalTest - Datos de la prueba médica.
   * @returns {Observable<MessageResponse>} Un observable que emite un objeto `MessageResponse`.
   */
  public updateMedicalTest(
    id: string,
    medicalTest: MedicalTest
  ): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(medicalTest);

    return this._http.put<MessageResponse>(
      `${this.url}${id}/`,
      params,
      httpOptions
    );
  }

  /**
   * Elimina una prueba médica.
   * @param {string} id - ID de la prueba médica.
   * @returns {Observable<MessageResponse>} Un observable que emite un objeto `MessageResponse`.
   */
  public deleteMedicalTest(id: string): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.delete<MessageResponse>(`${this.url}${id}/`, httpOptions);
  }

  /**
   * Activa una prueba médica.
   * @param {string} id - ID de la prueba médica.
   * @returns {Observable<MessageResponse>} Un observable que emite un objeto `MessageResponse`.
   */
  public activateMedicalTest(id: string): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.put<MessageResponse>(
      `${this.url}${id}/activate/`,
      {},
      httpOptions
    );
  }

  /**
   * Gestiona la descarga de un fichero adjunto de una prueba médica.
   * @param {string} attachmentId ID del fichero adjunto.
   * @returns {Observable<Blob>} El archivo adjunto.
   */
  public downloadMedicalTestAttachment(attachmentId: string): Observable<Blob> {
    const headers = this._httpCommonService.getCommonHeaders();

    return this._http
      .get(
        `${API_URL}medicaltestattachments/${attachmentId}/download-attachment/`,
        {
          headers,
          responseType: 'blob',
          observe: 'response',
        }
      )
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
   * @param {MedicalTestAttachment} attachment Fichero adjunto.
   * @returns {Observable<MessageResponse>} Un observable que emite un objeto `MessageResponse`.
   */
  public uploadMedicalTestAttachment(
    attachment: MedicalTestAttachment
  ): Observable<MessageResponse> {
    let headers = this._httpCommonService.getCommonHeaders();
    headers = headers.delete('Content-Type');
    const httpOptions = { headers };

    let formData = new FormData();
    formData.append('file', attachment.file);
    if (attachment.name) formData.append('name', attachment.name);
    if (attachment.description)
      formData.append('description', attachment.description);
    if (attachment.medical_test && typeof attachment.medical_test === 'string')
      formData.append('medical_test', attachment.medical_test);

    return this._http.post<MessageResponse>(
      `${API_URL}medicaltestattachments/upload-attachment/`,
      formData,
      httpOptions
    );
  }

  /**
   * Elimina un fichero adjunto de una prueba médica.
   * @param {string} attachmentId ID del fichero adjunto.
   * @returns {Observable<MessageResponse>} Un observable que emite un objeto `MessageResponse`.
   */
  public deleteMedicalTestAttachment(
    attachmentId: string
  ): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.delete<MessageResponse>(
      `${API_URL}medicaltestattachments/${attachmentId}/delete-attachment/`,
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
