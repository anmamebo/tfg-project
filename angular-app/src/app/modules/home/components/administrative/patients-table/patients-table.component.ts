import { Component } from '@angular/core';
import { EntityData } from 'src/app/core/models/entity-data.interface';
import { PatientService } from 'src/app/core/services/entities/patient.service';

/**
 * Componente que muestra una tabla de pacientes para
 * el panel principal del administrador
 */
@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
})
export class PatientsTableComponent {
  /** Datos de la entidad. */
  public entityData: EntityData;

  constructor(private patientService: PatientService) {
    this.entityData = {
      title: {
        hasTitle: true,
        title: 'Pacientes',
      },
      entityPlural: 'Pacientes',
      entitySingular: 'Paciente',
      columns: [
        { header: 'DNI', field: 'dni' },
        { header: 'NOMBRE', field: 'user.name' },
        { header: 'APELLIDOS', field: 'user.last_name' },
        { header: 'EMAIL', field: 'user.email' },
      ],
      create: {
        hasCreate: false,
      },
      actions: {
        hasActions: false,
      },
      service: this.patientService,
      items: null,
      page: 1,
      totalPages: 1,
      numItems: 0,
      numResults: 5,
      search: {
        hasSearch: false,
      },
      hasStateFilter: false,
    };
  }
}
