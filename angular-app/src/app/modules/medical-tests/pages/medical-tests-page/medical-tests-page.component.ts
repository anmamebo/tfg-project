import { Component } from '@angular/core';

import { breadcrumbMedicalTestsData } from 'src/app/core/constants/breadcrumb-data';

// Modelos
import { EntityData } from 'src/app/core/models/entity-data.interface';

/**
 * Componente para la página de pruebas médicas.
 */
@Component({
  selector: 'app-medical-tests-page',
  templateUrl: './medical-tests-page.component.html',
})
export class MedicalTestsPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Pruebas Médicas';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver tus pruebas médicas.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbMedicalTestsData;

  /** Datos de la entidad. */
  public entityData: EntityData;

  constructor() {
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: 'Pruebas Médicas',
      entitySingular: 'Prueba Médica',
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
