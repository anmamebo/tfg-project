import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
   * Obtiene todos los países.
   * @returns Un observable que emite un objeto `any`.
   */
  public getCountries() {
    return this._http.get(`${this.url}all?fields=name,translations`);
  }
}
