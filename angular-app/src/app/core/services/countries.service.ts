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

  constructor(private http: HttpClient) {
    this.url = 'https://restcountries.com/v3.1/';
  }

  /**
   * Obtiene todos los países.
   * @returns Un observable que emite un objeto `any`.
   */
  public getCountries() {
    return this.http.get(`${this.url}all?fields=name,translations`);
  }
}
