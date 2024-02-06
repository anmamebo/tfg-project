import { Component } from '@angular/core';

import { breadcrumbPatientsCreateData } from 'src/app/core/constants/breadcrumb-data.constants';

/**
 * Componente para la página de creación de un paciente.
 */
@Component({
  selector: 'app-patients-create-page',
  templateUrl: './patients-create-page.component.html',
})
export class PatientsCreatePageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Alta paciente';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes dar de alta a un paciente.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbPatientsCreateData;
}
