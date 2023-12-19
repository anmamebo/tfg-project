import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';

import { DepartmentService } from '../services/entities/department.service';

export const departmentResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  departmentService: DepartmentService = inject(DepartmentService),
  router: Router = inject(Router)
): Observable<any> => {
  const departmentId = route.params['id'];
  return departmentService.getItemById(departmentId).pipe(
    map((department) => {
      if (department) {
        return department;
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
