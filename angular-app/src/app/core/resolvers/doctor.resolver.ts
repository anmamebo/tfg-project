import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';

import { DoctorService } from '../services/doctor.service';

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
