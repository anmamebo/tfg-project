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

        // Si el error tiene errores de validación
        if (error.error.errors) {
          errorMessage += "\n";
          const errors: any[] = error.error.errors;
          Object.keys(errors).forEach((key: any) => {
            const messages: any[] = errors[key];
            messages.forEach((message: any) => {
              errorMessage += message + "\n";
            });
          });
        }

        throw new Error(errorMessage);
      })
    );
  }
}
