import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from 'src/app/core/constants/API_URL';

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
    this.url = API_URL.url + 'addresses/';
  }

  /**
   * Crea una dirección.
   * @param {Address} address El objeto con los datos de la dirección.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public createAddress(address: Address): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(address);

    return this._http.post<any>(`${this.url}`, params, httpOptions);
  }

  /**
   * Actualiza los datos de una dirección.
   * @param {Address} address El objeto con los datos actualizados.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public updateAddress(address: Address): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(address);

    return this._http.put<any>(
      `${this.url}${address.id}/`,
      params,
      httpOptions
    );
  }

  /**
   * Elimina una dirección.
   * @param {string} id El identificador de la dirección.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public deleteAddress(id: string): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    return this._http.delete<any>(`${this.url}${id}/`, httpOptions);
  }
}
