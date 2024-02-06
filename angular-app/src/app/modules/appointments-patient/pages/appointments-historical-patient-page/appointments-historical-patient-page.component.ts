import { Component } from '@angular/core';
import { breadcrumbAppointmentsHistoricalPatientData } from 'src/app/core/constants/breadcrumb-data.constants';
import { EntityData } from 'src/app/core/models/entity-data.interface';

/**
 * Componente para la página de citas históricas del paciente.
 */
@Component({
  selector: 'app-appointments-historical-patient-page',
  templateUrl: './appointments-historical-patient-page.component.html',
})
export class AppointmentsHistoricalPatientPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Historial de Citas';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver el historial de tus citas.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbAppointmentsHistoricalPatientData;

  /** Datos de la entidad. */
  public entityData: EntityData;

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
      numResults: 5,
      search: {
        hasSearch: true,
        search: '',
      },
      hasStateFilter: false,
    };
  }
}
