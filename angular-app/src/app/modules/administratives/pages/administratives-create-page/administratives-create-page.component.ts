import { Component } from '@angular/core';
import { breadcrumbAdministrativesCreateData } from '@app/core/constants/breadcrumb-data.constants';

/**
 * Componente para la página de creación de un administrativo.
 */
@Component({
  selector: 'app-administratives-create-page',
  templateUrl: './administratives-create-page.component.html',
})
export class AdministrativesCreatePageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Alta administrativo';

  /** Descripción de la página. */
  public pageDescription: string =
    'Aquí puedes dar de alta a un administrativo.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbAdministrativesCreateData;
}
