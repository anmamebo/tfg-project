import { Component } from '@angular/core';

import { ROLES } from 'src/app/core/constants/roles.constants';
import { breadcrumbPatientsData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { PatientService } from 'src/app/core/services/entities/patient.service';

// Modelos
import { EntityData } from 'src/app/core/models/entity-data.interface';

/**
 * Componente para la página de pacientes.
 */
@Component({
  selector: 'app-patients-page',
  templateUrl: './patients-page.component.html',
})
export class PatientsPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Pacientes';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver a los pacientes.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbPatientsData;

  /** Datos de la entidad. */
  public entityData: EntityData;

  constructor(private patientService: PatientService) {
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: 'Pacientes',
      entitySingular: 'Paciente',
      columns: [
        { header: 'DNI', field: 'dni' },
        { header: 'Nº SEGURIDAD SOCIAL', field: 'social_security' },
        { header: 'NOMBRE', field: 'user.name' },
        { header: 'APELLIDOS', field: 'user.last_name' },
        { header: 'EMAIL', field: 'user.email' },
        { header: 'TELÉFONO', field: 'phone' },
      ],
      create: {
        hasCreate: true,
        createText: 'Alta Paciente',
        create: '/pacientes/crear',
        roles: [ROLES.ADMIN, ROLES.DOCTOR],
      },
      actions: {
        hasActions: true,
        actions: {
          show: {
            url: '/pacientes',
            roles: [ROLES.ADMIN, ROLES.DOCTOR],
          },
          edit: {
            url: '/pacientes/editar',
            roles: [ROLES.ADMIN, ROLES.DOCTOR],
          },
          delete: {
            roles: [ROLES.ADMIN],
          },
        },
      },
      service: this.patientService,
      items: null,
      page: 1,
      totalPages: 1,
      numItems: 0,
      numResults: 10,
      search: {
        hasSearch: true,
        search: '',
      },
      hasStateFilter: true,
    };
  }
}
