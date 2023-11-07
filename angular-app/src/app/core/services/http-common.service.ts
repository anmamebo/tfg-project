import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class HttpCommonService {

  constructor(
    private tokenStorageService: TokenStorageService
  ) { }

  public getCommonHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const token = this.tokenStorageService.getToken();
    
    if (token) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    }    

    return headers;
  }
}
