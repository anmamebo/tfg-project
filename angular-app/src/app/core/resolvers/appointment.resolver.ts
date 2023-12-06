import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';

import { AppointmentService } from '../services/appointment.service';

export const appointmentForDoctorResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  appointmentService: AppointmentService = inject(AppointmentService),
  router: Router = inject(Router)
): Observable<any> => {
  const appointmentId = route.params['id'];
  return appointmentService.getAppointmentByIdByDoctor(appointmentId).pipe(
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
