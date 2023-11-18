import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error en el servidor. Inténtalo más tarde.';
        
        if (error.status === 400) {
          errorMessage = error.error.message || 'Hubo un problema con la solicitud.';
        } else if (error.status === 404) {
          errorMessage = error.error.message || 'No se encontró el recurso solicitado.';
        } else if (error.status === 0) {
          errorMessage = 'Erro de conexión. Comprueba tu conexión a internet.';
        }

        throw new Error(errorMessage);
      })
    );
  }
}
