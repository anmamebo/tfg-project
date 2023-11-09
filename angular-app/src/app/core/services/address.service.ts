import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { HttpCommonService } from "./http-common.service";

import { API_URL } from '../constants/API_URL';

import { Address } from '../models/address.model';


@Injectable({
  providedIn: 'root'
})
export class AddressService {
  /**
   * URL base de la API para la gestión de direcciones.
   */
  public url: string;

  constructor(
    private http: HttpClient,
    private httpCommonService: HttpCommonService,
  ) { 
    this.url = API_URL.url;
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

    return this.http.put<any>(this.url + 'patients/addresses/' + address.id + '/', params, httpOptions)
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
