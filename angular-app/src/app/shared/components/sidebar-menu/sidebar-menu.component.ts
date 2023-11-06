import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';


import { sidebarData } from "src/app/core/constants/sidebar-items";


@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  public sidebarItems: any[] = [];
  public currentURL: string = "";
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

  ngOnInit(): void {
  }

  ngOnDestroy () {
    this.subscriber?.unsubscribe();
  }
}
