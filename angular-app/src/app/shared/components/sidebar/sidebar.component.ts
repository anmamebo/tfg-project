import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  myScriptElement: HTMLScriptElement;

  constructor() {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = 'assets/js/components/sidebar.js';
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {}
}
