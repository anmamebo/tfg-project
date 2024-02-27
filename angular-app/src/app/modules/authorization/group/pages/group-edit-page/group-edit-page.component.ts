import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { breadcrumbGroupEditData } from '@app/core/constants/breadcrumb-data.constants';
import { Group } from '@app/core/models/group.interface';

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

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.group = this._route.snapshot.data['data']; // Obtiene los datos del grupo desde el resolver
  }
}
