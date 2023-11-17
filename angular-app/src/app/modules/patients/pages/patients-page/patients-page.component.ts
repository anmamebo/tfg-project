import { Component } from '@angular/core';

import { breadcrumbPatientsData } from "src/app/core/constants/breadcrumb-data";


/**
 * Componente para la página de pacientes.
 */
@Component({
  selector: 'app-patients-page',
  templateUrl: './patients-page.component.html',
  styleUrls: ['./patients-page.component.scss']
})
export class PatientsPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Pacientes';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver a los pacientes.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbPatientsData

  constructor() { }
}
