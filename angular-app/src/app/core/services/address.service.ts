import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { API_URL } from '../constants/API_URL';

// Servicios
import { HttpCommonService } from "./http-common.service";

// Modelos
import { Address } from '../models/address.model';


/**
 * Servicio para la gestión de direcciones.
 */
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  /** URL base de la API. */
  public url: string;

  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService,
  ) { 
    this.url = API_URL.url + 'patients/addresses/';
  }

  /**
   * Crea una dirección.
   * @param address El objeto `Address` con los datos de la dirección.
   * @returns Un observable que emite un objeto `any`.
   */
  public createAddress(address: Address): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(address);

    return this.http.post<any>(this.url, params, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            let errorMessage = error.error.message;
            throw new Error(errorMessage);
          }
          throw new Error('Ocurrió un error en el servidor. Inténtalo más tarde.');
        })
      );
  }

  /**
   * Actualiza los datos de una dirección.
   * @param address El objeto `Address` con los datos actualizados.
   * @returns Un observable que emite un objeto `any`.
   */
  public updateAddress(address: Address): Observable<any> {
    const headers = this.httpCommonService.getCommonHeaders();
    const httpOptions = { headers };

    let params = JSON.stringify(address);

    return this.http.put<any>(this.url + address.id + '/', params, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            let errorMessage = error.error.message;
            throw new Error(errorMessage);
          }
          throw new Error('Ocurrió un error en el servidor. Inténtalo más tarde.');
        })
      );
  }
}
