import { Component } from '@angular/core';

import { breadcrumbDoctorsCreateData } from 'src/app/core/constants/breadcrumb-data';

/**
 * Componente para la página de creación de un médico.
 */
@Component({
  selector: 'app-doctors-create-page',
  templateUrl: './doctors-create-page.component.html',
})
export class DoctorsCreatePageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Alta médico';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes dar de alta a un médico.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbDoctorsCreateData;
}
