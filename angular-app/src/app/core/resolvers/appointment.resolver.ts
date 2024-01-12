import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';

import { AppointmentService } from '../services/entities/appointment.service';

/**
 * Resolver que obtiene detalles de una cita para un doctor específico.
 * @param {ActivatedRouteSnapshot} route - El snapshot actual de la ruta.
 * @param {RouterStateSnapshot} state - El estado actual del enrutador.
 * @param {AppointmentService} appointmentService - Servicio para obtener detalles de la cita.
 * @param {Router} router - Enrutador para redireccionar en caso de error.
 * @returns {Observable<any>} - Un observable que emite los detalles de la cita.
 */
export const appointmentForDoctorResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  appointmentService: AppointmentService = inject(AppointmentService),
  router: Router = inject(Router)
): Observable<any> => {
  const appointmentId = route.params['id'];
  return appointmentService.getAppointmentByIdForDoctor(appointmentId).pipe(
    map((appointment) => {
      if (appointment) {
        return appointment;
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
