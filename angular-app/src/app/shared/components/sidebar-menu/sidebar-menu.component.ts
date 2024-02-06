import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { sidebarData } from 'src/app/core/constants/sidebar-items.constants';

/**
 * Componente que representa el menú lateral de la aplicación.
 */
@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
})
export class SidebarMenuComponent implements OnDestroy {
  /** Elementos del menú lateral. */
  public sidebarItems: any[] = [];

  /** URL actual. */
  public currentURL: string = '';

  /** Objeto `Subscription` para desuscribirse de los observables. */
  public subscriber: Subscription = new Subscription();

  constructor(private _router: Router) {
    this.sidebarItems = sidebarData;

    this.subscriber = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentURL = event['url'];
      });
  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }
}
