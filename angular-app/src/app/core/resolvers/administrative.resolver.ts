import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AdministrativeService } from '../services/entities/administrative.service';

/**
 * Resolver que obtiene detalles de un administrativo por su ID.
 * @param {ActivatedRouteSnapshot} route - El snapshot actual de la ruta.
 * @param {RouterStateSnapshot} state - El estado actual del enrutador.
 * @param {DoctorService} doctorService - Servicio para obtener detalles del doctor.
 * @param {Router} router - Enrutador para redireccionar en caso de error.
 * @returns {Observable<any>} - Un observable que emite los detalles del doctor.
 */
export const administrativeResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  administrativeService: AdministrativeService = inject(AdministrativeService),
  router: Router = inject(Router)
): Observable<any> => {
  const administrativeId = route.params['id'];
  return administrativeService.getItemById(administrativeId).pipe(
    map((administrative) => {
      if (administrative) {
        return administrative;
      } else {
        router.navigate(['**'], { replaceUrl: true });
        return null;
      }
    }),
    catchError(() => {
      router.navigate(['**'], { replaceUrl: true }); // Redirecciona a la página de error cuando la solicitud falla
      return of(null);
    })
  );
};
