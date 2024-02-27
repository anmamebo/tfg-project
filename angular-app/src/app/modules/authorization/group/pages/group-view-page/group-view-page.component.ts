import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { breadcrumbGroupViewData } from '@app/core/constants/breadcrumb-data.constants';
import { Group } from '@app/core/models/group.interface';

/**
 * Componente para la página de visualización de un grupo
 */
@Component({
  selector: 'app-group-view-page',
  templateUrl: './group-view-page.component.html',
})
export class GroupViewPageComponent implements OnInit {
  /** Título de la página */
  public pageTitle: string = 'Visualizar grupo';

  /** Descripción de la página */
  public pageDescription: string = 'Aquí puedes visualizar un grupo (rol).';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbGroupViewData;

  /** Grupo que se visualizará */
  public group: Group | null = null;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.group = this._route.snapshot.data['data']; // Obtiene los datos del grupo desde el resolver
  }
}
