import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para la gestión de países.
 */
@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  /** URL base de la API. */
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = 'https://restcountries.com/v3.1/';
  }

  /**
   * Obtiene los países.
   * @returns {Observable<any>} Un observable que emite la respuesta del servidor.
   */
  public getCountries(): Observable<any> {
    return this._http.get(`${this.url}all?fields=name,translations`);
  }
}
