import { Component } from '@angular/core';

import { breadcrumbAppointmentsHistoricalData } from 'src/app/core/constants/breadcrumb-data';

// Modelos
import { entityData } from 'src/app/core/models/entityData.model';

/**
 * Componente para la página del historial de citas.
 */
@Component({
  selector: 'app-appointments-historical-view-page',
  templateUrl: './appointments-historical-view-page.component.html',
})
export class AppointmentsHistoricalViewPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Historial de citas';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver el historial de citas.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbAppointmentsHistoricalData;

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
      hasStateFilter: false,
    };
  }
}
