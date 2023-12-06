import { Component } from '@angular/core';

import { breadcrumbDepartmentsCreateData } from 'src/app/core/constants/breadcrumb-data';

/**
 * Componente para la página de creación de un departamento.
 */
@Component({
  selector: 'app-departments-create-page',
  templateUrl: './departments-create-page.component.html',
  styleUrls: ['./departments-create-page.component.scss'],
})
export class DepartmentsCreatePageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Crear departamento';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes crear un departamento.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbDepartmentsCreateData;
}
