import { Component, OnInit, ViewChild } from '@angular/core';

import { ListGroupCardComponent } from "../../components/list-group-card/list-group-card.component";

import { breadcrumbGroupData } from "src/app/core/constants/breadcrumb-data";


@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {
  /**
   * Título de la página.
   */
  public pageTitle: string = 'Grupos (Roles)';

  /**
   * Descripción de la página.
   */
  public pageDescription: string = 'Aquí puedes ver los diferentes grupos (roles).';
  
  /**
   * Datos para el componente `app-breadcrumb`.
   */
  public breadcrumbData = breadcrumbGroupData;

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
    this.listGroupCardComponent.getGroups(this.listGroupCardComponent.page);
  }
}
