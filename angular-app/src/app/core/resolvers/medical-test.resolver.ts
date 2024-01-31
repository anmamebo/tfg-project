import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';

import { MedicalTestService } from 'src/app/core/services/entities/medicaltest.service';

/**
 * Resolver que obtiene detalles de una prueba médica por su ID.
 * @param {ActivatedRouteSnapshot} route - El snapshot actual de la ruta.
 * @param {RouterStateSnapshot} state - El estado actual del enrutador.
 * @param {MedicalTestService} medicalTestService - Servicio para obtener detalles de la prueba médica.
 * @param {Router} router - Enrutador para redireccionar en caso de error.
 * @returns {Observable<any>} - Un observable que emite los detalles de la prueba médica.
 */
export const medicalTestResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  medicalTestService: MedicalTestService = inject(MedicalTestService),
  router: Router = inject(Router)
): Observable<any> => {
  const medicalTestId = route.params['id'];
  return medicalTestService.getMedicalTestById(medicalTestId).pipe(
    map((medicalTest) => {
      if (medicalTest) {
        return medicalTest;
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
