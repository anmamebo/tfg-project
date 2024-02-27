import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { MedicalspecialtyService } from '@app/core/services/entities/medicalspecialty.service';
import { Observable, catchError, map, of } from 'rxjs';

/**
 * Resolver que obtiene detalles de una especialidad médica por su ID.
 * @param {ActivatedRouteSnapshot} route - El snapshot actual de la ruta.
 * @param {RouterStateSnapshot} state - El estado actual del enrutador.
 * @param {MedicalspecialtyService} medicalSpecialtyService - Servicio para obtener detalles de la especialidad médica.
 * @param {Router} router - Enrutador para redireccionar en caso de error.
 * @returns {Observable<any>} - Un observable que emite los detalles de la especialidad médica.
 */
export const medicalSpecialtyResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  medicalSpecialtyService: MedicalspecialtyService = inject(
    MedicalspecialtyService
  ),
  router: Router = inject(Router)
): Observable<any> => {
  const medicalSpecialtyId = route.params['id'];
  return medicalSpecialtyService.getItemById(medicalSpecialtyId).pipe(
    map((medicalSpecialty) => {
      if (medicalSpecialty) {
        return medicalSpecialty;
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
