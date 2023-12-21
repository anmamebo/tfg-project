import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';

import { MedicalspecialtyService } from 'src/app/core/services/entities/medicalspecialty.service';

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
