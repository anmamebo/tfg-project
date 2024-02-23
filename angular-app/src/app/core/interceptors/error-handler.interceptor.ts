import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _tokenStorageService: TokenStorageService
  ) {}

  /**
   * Intercepta las solicitudes HTTP y maneja los errores.
   * @param {HttpRequest<any>} request - La solicitud HTTP.
   * @param {HttpHandler} next - El siguiente manipulador en la cadena.
   * @returns {Observable<HttpEvent<any>>} - Un observable de eventos HTTP.
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage =
          'Ocurrió un error en el servidor. Inténtalo más tarde.';
        if (error.status === 401) {
          console.log(error);
        }

        if (error.status === 400) {
          errorMessage =
            error.error.message || 'Hubo un problema con la solicitud.';
        } else if (
          error.status === 401 &&
          error.error.detail ===
            'El token dado no es valido para ningun tipo de token'
        ) {
          return this.handleUnauthorizedError(request, next);
        } else if (
          error.status === 401 &&
          error.error.detail === 'El token es inválido o ha expirado'
        ) {
          return this.handleExpiredTokenError(request, next);
        } else if (error.status === 404) {
          errorMessage =
            error.error.message || 'No se encontró el recurso solicitado.';
        } else if (error.status === 403) {
          errorMessage = error.error.message || 'No tienes permisos.';
        } else if (error.status === 0) {
          errorMessage = 'Error de conexión. Comprueba tu conexión a internet.';
        }

        // Manejo de errores anidados
        const handleNestedErrors = (errors: any) => {
          if (typeof errors === 'object') {
            // Si es un objeto
            Object.keys(errors).forEach((key: any) => {
              // Recorremos las llaves
              const errorValue = errors[key]; // Obtenemos el valor del error

              if (Array.isArray(errorValue)) {
                // Si es un arreglo
                errorValue.forEach((message: any) => {
                  // Recorremos los mensajes
                  errorMessage += '\n' + message;
                });
              } else if (typeof errorValue === 'object') {
                // Si es un objeto
                handleNestedErrors(errorValue); // Volvemos a llamar a la función
              }
            });
          }
        };

        if (error.error.errors) {
          handleNestedErrors(error.error.errors);
        }

        throw new Error(errorMessage);
      })
    );
  }

  /**
   * Maneja los errores de autenticación.
   * Refresca el token de autenticación y reenvía la solicitud.
   * @param {HttpRequest<any>} request - La solicitud HTTP.
   * @param {HttpHandler} next - El siguiente manipulador en la cadena.
   * @returns {Observable<HttpEvent<any>>} - Un observable de eventos HTTP.
   */
  private handleUnauthorizedError(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this._authService.refreshToken().pipe(
      switchMap((response: any) => {
        this._tokenStorageService.saveTokenSession(response.access);
        this._tokenStorageService.saveRefreshTokenSession(response.refresh);

        const authRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${response.access}`,
          },
        });
        return next.handle(authRequest);
      }),
      catchError((error: HttpErrorResponse) => {
        throw new Error(
          error.error.message || 'No se pudo refrescar el token.'
        );
      })
    );
  }

  /**
   * Maneja los errores de token expirado.
   * Cierra la sesión del usuario y recarga la página.
   * @param {HttpRequest<any>} request - La solicitud HTTP.
   * @param {HttpHandler} next - El siguiente manipulador en la cadena.
   * @returns {Observable<HttpEvent<any>>} - Un observable de eventos HTTP.
   */
  private handleExpiredTokenError(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._tokenStorageService.signOut();
    window.location.reload();
    return next.handle(request);
  }
}
