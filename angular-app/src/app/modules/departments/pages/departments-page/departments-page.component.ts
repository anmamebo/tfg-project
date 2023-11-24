import { Component } from '@angular/core';

import { breadcrumbDepartmentsData } from "src/app/core/constants/breadcrumb-data";


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

  constructor() { }
}
