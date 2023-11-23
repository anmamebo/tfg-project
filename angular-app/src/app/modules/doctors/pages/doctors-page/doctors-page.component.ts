import { Component } from '@angular/core';

import { breadcrumbDoctorsData } from "src/app/core/constants/breadcrumb-data";


/**
 * Componente para la página de doctores.
 */
@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors-page.component.html',
  styleUrls: ['./doctors-page.component.scss']
})
export class DoctorsPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Médicos';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver a los médicos.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbDoctorsData

  constructor() { }
}
