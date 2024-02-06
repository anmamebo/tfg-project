import { Component } from '@angular/core';

import { ROLES } from 'src/app/core/constants/roles.constants';
import { breadcrumbDepartmentsData } from 'src/app/core/constants/breadcrumb-data.constants';

// Servicios
import { DepartmentService } from 'src/app/core/services/entities/department.service';

// Modelos
import { EntityData } from 'src/app/core/models/entity-data.interface';

/**
 * Componente para la página de departamentos.
 */
@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
})
export class DepartmentsPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Departamentos';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver a los departamentos.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbDepartmentsData;

  /** Datos de la entidad. */
  public entityData: EntityData;

  constructor(private _departmentService: DepartmentService) {
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: 'Departamentos',
      entitySingular: 'Departamento',
      columns: [
        { header: 'NOMBRE', field: 'name' },
        { header: 'DESCRIPCIÓN', field: 'description' },
      ],
      create: {
        hasCreate: true,
        createText: 'Crear Departamento',
        create: '/departamentos/crear',
        roles: [ROLES.ADMIN],
      },
      actions: {
        hasActions: true,
        actions: {
          show: {
            url: '/departamentos',
            roles: [ROLES.ADMIN, ROLES.DOCTOR],
          },
          edit: {
            url: '/departamentos/editar',
            roles: [ROLES.ADMIN],
          },
          delete: {
            roles: [ROLES.ADMIN],
          },
        },
      },
      service: this._departmentService,
      items: null,
      page: 1,
      totalPages: 1,
      numItems: 0,
      numResults: 10,
      search: {
        hasSearch: true,
        search: '',
        searchInfoTooltip: 'Buscar departamentos por id, nombre o descripción.',
      },
      hasStateFilter: true,
    };
  }
}
