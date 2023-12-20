import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

// Servicios
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';

/**
 * Servicio para la gestión de encabezados HTTP comunes.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpCommonService {
  constructor(private _tokenStorageService: TokenStorageService) {}

  /**
   * Obtiene los encabezados HTTP comunes.
   * @returns {HttpHeaders} Los encabezados HTTP comunes.
   */
  public getCommonHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const token = this._tokenStorageService.getToken();
    if (token) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    }

    return headers;
  }
}
