import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { GroupService } from '../services/entities/group.service';

/**
 * Resolver que obtiene detalles de un grupo por su ID.
 * @param {ActivatedRouteSnapshot} route - El snapshot actual de la ruta.
 * @param {RouterStateSnapshot} state - El estado actual del enrutador.
 * @param {GroupService} groupService - Servicio para obtener detalles del grupo.
 * @param {Router} router - Enrutador para redireccionar en caso de error.
 * @returns {Observable<any>} - Un observable que emite los detalles del grupo.
 */
export const groupResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  groupService: GroupService = inject(GroupService),
  router: Router = inject(Router)
): Observable<any> => {
  const groupId = route.params['id'];
  return groupService.getItemById(groupId).pipe(
    map((group) => {
      if (group) {
        return group;
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
