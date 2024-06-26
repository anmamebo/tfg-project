import { Component } from '@angular/core';
import { breadcrumbAppointmentsPatientData } from '@app/core/constants/breadcrumb-data.constants';
import { EntityData } from '@app/core/models/entity-data.interface';

/**
 * Componente para la página de citas del paciente.
 */
@Component({
  selector: 'app-appointments-patient-page',
  templateUrl: './appointments-patient-page.component.html',
})
export class AppointmentsPatientPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Mis Citas';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver tus citas.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbAppointmentsPatientData;

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
