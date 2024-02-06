import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { RoomService } from '../services/entities/room.service';

/**
 * Resolver que obtiene detalles de una habitación por su ID.
 * @param {ActivatedRouteSnapshot} route - El snapshot actual de la ruta.
 * @param {RouterStateSnapshot} state - El estado actual del enrutador.
 * @param {RoomService} roomService - Servicio para obtener detalles de la habitación.
 * @param {Router} router - Enrutador para redireccionar en caso de error.
 * @returns {Observable<any>} - Un observable que emite los detalles de la habitación.
 */
export const roomResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  roomService: RoomService = inject(RoomService),
  router: Router = inject(Router)
): Observable<any> => {
  const roomId = route.params['id'];
  return roomService.getItemById(roomId).pipe(
    map((room) => {
      if (room) {
        return room;
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
