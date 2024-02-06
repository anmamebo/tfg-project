import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from 'src/app/core/constants/API-URL.constants';

import { MessageResponse } from 'src/app/core/models/response/message-response.interface';

// Servicios
import { HttpCommonService } from 'src/app/core/services/http-common/http-common.service';

// Modelos
import { Address } from 'src/app/core/models/address.interface';

/**
 * Servicio para la gestión de direcciones.
 */
@Injectable({
  providedIn: 'root',
})
export class AddressService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private _http: HttpClient,
    private _httpCommonService: HttpCommonService
  ) {
    this.url = API_URL + 'addresses/';
  }

  /**
   * Crea una dirección.
   * @param {Address} address El objeto con los datos de la dirección.
   * @returns {Observable<MessageResponse>} Un observable que emite la respuesta del servidor.
   */
  public createAddress(address: Address): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(address);

    return this._http.post<MessageResponse>(`${this.url}`, params, httpOptions);
  }

  /**
   * Actualiza los datos de una dirección.
   * @param {Address} address El objeto con los datos actualizados.
   * @returns {Observable<MessageResponse>} Un observable que emite la respuesta del servidor.
   */
  public updateAddress(address: Address): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(address);

    return this._http.put<MessageResponse>(
      `${this.url}${address.id}/`,
      params,
      httpOptions
    );
  }

  /**
   * Elimina una dirección.
   * @param {string} id El identificador de la dirección.
   * @returns {Observable<MessageResponse>} Un observable que emite la respuesta del servidor.
   */
  public deleteAddress(id: string): Observable<MessageResponse> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.delete<MessageResponse>(`${this.url}${id}/`, httpOptions);
  }
}
