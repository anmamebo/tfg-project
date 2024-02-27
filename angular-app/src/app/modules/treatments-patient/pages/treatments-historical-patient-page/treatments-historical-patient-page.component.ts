import { Component } from '@angular/core';
import { breadcrumbTreatmentsHistoricalPatientData } from '@app/core/constants/breadcrumb-data.constants';
import { EntityData } from '@app/core/models/entity-data.interface';

/**
 * Componente para la página de tratamientos históricos del paciente.
 */
@Component({
  selector: 'app-treatments-historical-patient-page',
  templateUrl: './treatments-historical-patient-page.component.html',
})
export class TreatmentsHistoricalPatientPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Historial de Tratamientos';

  /** Descripción de la página. */
  public pageDescription: string =
    'Aquí puedes ver el historial de tus tratamientos.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbTreatmentsHistoricalPatientData;

  /** Datos de la entidad. */
  public entityData: EntityData;

  constructor() {
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: 'Tratamientos',
      entitySingular: 'Tratamiento',
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
