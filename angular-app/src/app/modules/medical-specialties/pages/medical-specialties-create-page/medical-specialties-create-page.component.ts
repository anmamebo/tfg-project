import { Component } from '@angular/core';

import { breadcrumbMedicalSpecialtiesCreateData } from 'src/app/core/constants/breadcrumb-data.constants';

/**
 * Componente para la página de creación de una especialidad médica.
 */
@Component({
  selector: 'app-medical-specialties-create-page',
  templateUrl: './medical-specialties-create-page.component.html',
})
export class MedicalSpecialtiesCreatePageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Crear especialidad médica';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes crear una especialidad médica.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbMedicalSpecialtiesCreateData;
}
