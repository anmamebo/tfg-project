import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbGroupEditData } from 'src/app/core/constants/breadcrumb-data';

// Modelos
import { Group } from 'src/app/core/models/group.model';

/**
 * Componente para la página de edición de un grupo.
 */
@Component({
  selector: 'app-group-edit-page',
  templateUrl: './group-edit-page.component.html',
})
export class GroupEditPageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Editar grupo';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes editar un grupo (rol).';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbGroupEditData;

  /** Grupo a editar. */
  public group: Group | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.group = this.route.snapshot.data['data']; // Obtiene los datos del grupo desde el resolver
  }
}
