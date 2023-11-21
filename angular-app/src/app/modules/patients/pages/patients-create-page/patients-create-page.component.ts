import { Component } from '@angular/core';

import { breadcrumbPatientsCreateData } from "src/app/core/constants/breadcrumb-data";


/**
 * Componente para la página de creación de un paciente.
 */
@Component({
  selector: 'app-patients-create-page',
  templateUrl: './patients-create-page.component.html',
  styleUrls: ['./patients-create-page.component.scss']
})
export class PatientsCreatePageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Crear paciente';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes crear un paciente.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbPatientsCreateData;

}
