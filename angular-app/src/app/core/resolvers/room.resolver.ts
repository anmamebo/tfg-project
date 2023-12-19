import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';

import { RoomService } from '../services/entities/room.service';

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
