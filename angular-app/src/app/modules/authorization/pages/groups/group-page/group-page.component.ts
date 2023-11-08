import { Component, OnInit, ViewChild } from '@angular/core';

import { ListGroupCardComponent } from "../../../components/groups/list-group-card/list-group-card.component";

import { breadcrumbGroupData } from "src/app/core/constants/breadcrumb-data";


@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {
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
