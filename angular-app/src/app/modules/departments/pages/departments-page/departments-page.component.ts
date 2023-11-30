import { Component } from '@angular/core';

import { breadcrumbDepartmentsData } from "src/app/core/constants/breadcrumb-data";

// Servicios
import { DepartmentService } from "src/app/core/services/department.service";

// Modelos
import { entityData } from 'src/app/core/models/entityData.model';


/**
 * Componente para la página de departamentos.
 */
@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.scss']
})
export class DepartmentsPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Departamentos';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver a los departamentos.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbDepartmentsData

  /** Datos de la entidad. */
  public entityData: entityData;

  constructor(
    private departmentService: DepartmentService,
  ) { 
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: 'Departamentos',
      entitySingular: 'Departamento',
      columns: [
        { header: 'ID', field: 'id' },
        { header: 'NOMBRE', field: 'name' },
        { header: 'DESCRIPCIÓN', field: 'description' },
      ],
      create: {
        hasCreate: true,
        createText: 'Crear Departamento',
        create: '/departamentos/crear',
      },
      actions: {
        hasActions: true,
        actions: {
          show: '/departamentos',
          edit: '/departamentos/editar',
        }
      },
      service: this.departmentService,
      items: null,
      page: 1,
      totalPages: 1,
      numItems: 0,
      numResults: 10,
      search: {
        hasSearch: true,
        search: '',
      },
      hasStateFilter: true
    };
  }
}
