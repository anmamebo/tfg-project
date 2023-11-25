import { Component } from '@angular/core';

import { breadcrumbPatientsData } from "src/app/core/constants/breadcrumb-data";

// Servicios
import { PatientService } from "src/app/core/services/patient.service";

// Modelos
import { entityData } from 'src/app/core/models/entityData.model';


/**
 * Componente para la página de pacientes.
 */
@Component({
  selector: 'app-patients-page',
  templateUrl: './patients-page.component.html',
  styleUrls: ['./patients-page.component.scss']
})
export class PatientsPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Pacientes';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver a los pacientes.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbPatientsData

  /** Datos de la entidad. */
  public entityData: entityData;

  constructor(
    private patientService: PatientService,
  ) {
    this.entityData = {
      title: 'Listado de Pacientes',
      entityPlural: 'Pacientes',
      entitySingular: 'Paciente',
      columns: [
        { header: 'DNI', field: 'dni' },
        { header: 'Nº SEGURIDAD SOCIAL', field: 'social_security'},
        { header: 'NOMBRE', field: 'user.name' },
        { header: 'APELLIDOS', field: 'user.last_name' },
        { header: 'EMAIL', field: 'user.email' },
        { header: 'TELÉFONO', field: 'phone' },
      ],
      create: {
        hasCreate: true,
        createText: 'Crear Paciente',
        create: '/pacientes/crear',
      },
      actions: {
        hasActions: true,
        actions: {
          show: '/pacientes',
          edit: '/pacientes/editar',
        }
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
    };
  }
}
