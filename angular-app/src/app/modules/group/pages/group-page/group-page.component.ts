import { Component, OnInit, ViewChild } from '@angular/core';

import { ListGroupCardComponent } from "../../components/list-group-card/list-group-card.component";

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {
  /**
   * Datos para el componente `app-breadcrumb`.
   */
  public breadcrumbData = [
    { label: 'Panel Principal', url: '/'},
    { label: 'Grupos', url: '/grupo/grupos'}
  ]

  /**
   * Referencia al componente hijo `ListGroupCardComponent`.
   */
  @ViewChild(ListGroupCardComponent) listGroupCardComponent!: ListGroupCardComponent;

  constructor() { }

  ngOnInit(): void {}

  /**
   * Actualiza la lista de grupos.
   */
  updateGroupList() {
    this.listGroupCardComponent.getGroups();
  }
}
