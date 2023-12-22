import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';

import { DepartmentService } from '../services/entities/department.service';

/**
 * Resolver que obtiene detalles de un departamento por su ID.
 * @param {ActivatedRouteSnapshot} route - El snapshot actual de la ruta.
 * @param {RouterStateSnapshot} state - El estado actual del enrutador.
 * @param {DepartmentService} departmentService - Servicio para obtener detalles del departamento.
 * @param {Router} router - Enrutador para redireccionar en caso de error.
 * @returns {Observable<any>} - Un observable que emite los detalles del departamento.
 */
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
