import { Component } from '@angular/core';

import { breadCrumbTreatmentsPatientData } from 'src/app/core/constants/breadcrumb-data';

import { entityData } from 'src/app/core/models/entityData.model';

/**
 * Componente para la página de tratamientos del paciente.
 */
@Component({
  selector: 'app-treatments-patient-page',
  templateUrl: './treatments-patient-page.component.html',
})
export class TreatmentsPatientPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Mis Tratamientos';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver tus tratamientos.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadCrumbTreatmentsPatientData;

  /** Datos de la entidad. */
  public entityData: entityData;

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
