import { Component } from '@angular/core';
import { breadcrumbRoomsCreateData } from '@app/core/constants/breadcrumb-data.constants';

/**
 * Componente para la página de creación de una sala.
 */
@Component({
  selector: 'app-rooms-create-page',
  templateUrl: './rooms-create-page.component.html',
})
export class RoomsCreatePageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Crear sala';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes crear una sala.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbRoomsCreateData;
}
