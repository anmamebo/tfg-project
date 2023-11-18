import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbGroupViewData } from "src/app/core/constants/breadcrumb-data";

// Modelos
import { Group } from "src/app/core/models/group.model";


/**
 * Componente para la página de visualización de un grupo
 */
@Component({
  selector: 'app-group-view-page',
  templateUrl: './group-view-page.component.html',
  styleUrls: ['./group-view-page.component.scss'],
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

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.group  = this.route.snapshot.data['data']; // Obtiene los datos del grupo desde el resolver
  }
}
