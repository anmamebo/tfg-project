import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';

import { PatientService } from '../services/patient.service';

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
