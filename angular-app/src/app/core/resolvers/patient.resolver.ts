import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { PatientService } from '../services/entities/patient.service';

/**
 * Resolver que obtiene detalles de un paciente por su ID.
 * @param {ActivatedRouteSnapshot} route - El snapshot actual de la ruta.
 * @param {RouterStateSnapshot} state - El estado actual del enrutador.
 * @param {PatientService} patientService - Servicio para obtener detalles del paciente.
 * @param {Router} router - Enrutador para redireccionar en caso de error.
 * @returns {Observable<any>} - Un observable que emite los detalles del paciente.
 */
export const patientResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  patientService: PatientService = inject(PatientService),
  router: Router = inject(Router)
): Observable<any> => {
  const patientId = route.params['id'];
  return patientService.getItemById(patientId).pipe(
    map((patient) => {
      if (patient) {
        return patient;
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
