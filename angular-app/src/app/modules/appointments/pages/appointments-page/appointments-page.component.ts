import { Component } from '@angular/core';

import { breadcrumbAppointmentsData } from "src/app/core/constants/breadcrumb-data";

// Modelos
import { entityData } from 'src/app/core/models/entityData.model';


/**
 * Componente para la página de citas.
 */
@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
})
export class AppointmentsPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Citas';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver las citas.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbAppointmentsData

  /** Datos de la entidad. */
  public entityData: entityData;

  constructor() { 
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: 'Citas',
      entitySingular: 'Cita',
      columns: [],
      create: {
        hasCreate: false,
      },
      actions: {
        hasActions: false,
      },
      service: null,
      items: null,
      page: 1,
      totalPages: 1,
      numItems: 0,
      numResults: 10,
      search: {
        hasSearch: true,
        search: '',
      },
      hasStateFilter: false
    };
  }
}
