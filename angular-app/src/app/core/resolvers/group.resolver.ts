import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';

import { GroupService } from '../services/group.service';


export const groupResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot,
  groupService: GroupService = inject(GroupService),
  router: Router = inject(Router)
): Observable<any> => {
  
  const groupId = route.params['id'];
  return groupService.getGroupById(groupId)
    .pipe(
      map(group => {
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
