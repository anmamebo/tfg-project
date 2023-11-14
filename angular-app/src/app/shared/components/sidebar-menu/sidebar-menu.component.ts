import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { sidebarData } from "src/app/core/constants/sidebar-items";


/**
 * Componente que representa el menú lateral de la aplicación.
 */
@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnDestroy {
  /** Elementos del menú lateral. */
  public sidebarItems: any[] = [];

  /** URL actual. */
  public currentURL: string = "";

  /** Objeto `Subscription` para desuscribirse de los observables. */
  public subscriber: Subscription = new Subscription();

  constructor(
    private router: Router,
  ) { 
    this.sidebarItems = sidebarData;

    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentURL = event['url']
    });
  }

  ngOnDestroy () {
    this.subscriber?.unsubscribe();
  }
}
