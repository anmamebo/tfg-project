import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../../constants/API_URL';

// Servicios
import { HttpCommonService } from '../http-common/http-common.service';

// Modelos
import { Address } from '../../models/address.interface';

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
    this.url = API_URL.url + 'patients/addresses/';
  }

  /**
   * Crea una dirección.
   * @param address El objeto `Address` con los datos de la dirección.
   * @returns Un observable que emite un objeto `any`.
   */
  public createAddress(address: Address): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(address);

    return this._http.post<any>(this.url, params, httpOptions);
  }

  /**
   * Actualiza los datos de una dirección.
   * @param address El objeto `Address` con los datos actualizados.
   * @returns Un observable que emite un objeto `any`.
   */
  public updateAddress(address: Address): Observable<any> {
    const headers = this._httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(address);

    return this._http.put<any>(
      this.url + address.id + '/',
      params,
      httpOptions
    );
  }
}
