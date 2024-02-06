import { Component } from '@angular/core';
import { breadcrumbAdministrativesData } from 'src/app/core/constants/breadcrumb-data.constants';
import { ROLES } from 'src/app/core/constants/roles.constants';
import { EntityData } from 'src/app/core/models/entity-data.interface';
import { AdministrativeService } from 'src/app/core/services/entities/administrative.service';

/**
 * Componente para la página de administrativos.
 */
@Component({
  selector: 'app-administratives-page',
  templateUrl: './administratives-page.component.html',
})
export class AdministrativesPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Administrativos';

  /** Descripción de la página. */
  public pageDescription: string =
    'Aquí puedes ver los administrativos del hospital.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbAdministrativesData;

  /** Datos de la entidad. */
  public entityData: EntityData;

  constructor(private _administrativeService: AdministrativeService) {
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: 'Administrativos',
      entitySingular: 'Administrativo',
      columns: [
        { header: 'NOMBRE USUARIO', field: 'username' },
        { header: 'NOMBRE', field: 'name' },
        { header: 'APELLIDOS', field: 'last_name' },
        { header: 'EMAIL', field: 'email' },
      ],
      create: {
        hasCreate: true,
        createText: 'Alta Administrativo',
        create: '/administrativos/crear',
        roles: [ROLES.ADMIN],
      },
      actions: {
        hasActions: true,
        actions: {
          show: {
            url: '/administrativos',
            roles: [ROLES.ADMIN],
          },
          edit: {
            url: '/administrativos/editar',
            roles: [ROLES.ADMIN],
          },
          delete: {
            roles: [ROLES.ADMIN],
          },
        },
      },
      service: this._administrativeService,
      items: null,
      page: 1,
      totalPages: 1,
      numItems: 0,
      numResults: 10,
      search: {
        hasSearch: true,
        search: '',
        searchInfoTooltip:
          'Buscar administrativos por id, nombre, apellidos, email o nombre de usuario.',
      },
      hasStateFilter: true,
    };
  }
}
