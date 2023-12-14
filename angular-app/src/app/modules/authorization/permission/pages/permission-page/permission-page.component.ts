import { Component } from '@angular/core';

import { breadcrumbPermissionData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { PermissionService } from 'src/app/core/services/permission.service';

// Modelos
import { entityData } from 'src/app/core/models/entityData.model';

/**
 * Componente para la página de permisos.
 */
@Component({
  selector: 'app-permission-page',
  templateUrl: './permission-page.component.html',
})
export class PermissionPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Permisos';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver los diferentes permisos.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbPermissionData;

  /** Datos de la entidad. */
  public entityData: entityData;

  constructor(private _permissionService: PermissionService) {
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: 'Permisos',
      entitySingular: 'Permiso',
      columns: [
        { header: 'ID', field: 'id' },
        { header: 'NOMBRE', field: 'name' },
        { header: 'CÓDIGO', field: 'codename' },
        { header: 'MODELO RELACIONADO', field: 'content_type' },
      ],
      create: {
        hasCreate: false,
      },
      actions: {
        hasActions: false,
      },
      service: this._permissionService,
      items: null,
      page: 1,
      totalPages: 1,
      numItems: 0,
      numResults: 10,
      search: {
        hasSearch: true,
        search: '',
      },
      hasStateFilter: false,
    };
  }
}
