import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';

import { DoctorService } from '../services/entities/doctor.service';

/**
 * Resolver que obtiene detalles de un doctor por su ID.
 * @param {ActivatedRouteSnapshot} route - El snapshot actual de la ruta.
 * @param {RouterStateSnapshot} state - El estado actual del enrutador.
 * @param {DoctorService} doctorService - Servicio para obtener detalles del doctor.
 * @param {Router} router - Enrutador para redireccionar en caso de error.
 * @returns {Observable<any>} - Un observable que emite los detalles del doctor.
 */
export const doctorResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  doctorService: DoctorService = inject(DoctorService),
  router: Router = inject(Router)
): Observable<any> => {
  const doctorId = route.params['id'];
  return doctorService.getItemById(doctorId).pipe(
    map((doctor) => {
      if (doctor) {
        return doctor;
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
