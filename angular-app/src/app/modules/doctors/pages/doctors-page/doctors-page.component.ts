import { Component } from '@angular/core';
import { breadcrumbDoctorsData } from 'src/app/core/constants/breadcrumb-data.constants';
import { ROLES } from 'src/app/core/constants/roles.constants';
import { EntityData } from 'src/app/core/models/entity-data.interface';
import { DoctorService } from 'src/app/core/services/entities/doctor.service';

/**
 * Componente para la página de doctores.
 */
@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors-page.component.html',
})
export class DoctorsPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Médicos';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver a los médicos.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbDoctorsData;

  /** Datos de la entidad. */
  public entityData: EntityData;

  constructor(private _doctorService: DoctorService) {
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: 'Médicos',
      entitySingular: 'Médico',
      columns: [
        { header: 'Nº COLEGIADO', field: 'collegiate_number' },
        { header: 'NOMBRE', field: 'user.name' },
        { header: 'APELLIDOS', field: 'user.last_name' },
        { header: 'EMAIL', field: 'user.email' },
      ],
      create: {
        hasCreate: true,
        createText: 'Alta Médico',
        create: '/medicos/crear',
        roles: [ROLES.ADMIN],
      },
      actions: {
        hasActions: true,
        actions: {
          show: {
            url: '/medicos',
            roles: [ROLES.ADMIN],
          },
          edit: {
            url: '/medicos/editar',
            roles: [ROLES.ADMIN],
          },
          delete: {
            roles: [ROLES.ADMIN],
          },
        },
      },
      service: this._doctorService,
      items: null,
      page: 1,
      totalPages: 1,
      numItems: 0,
      numResults: 10,
      search: {
        hasSearch: true,
        search: '',
        searchInfoTooltip:
          'Buscar médicos por id, nombre, apellidos, email o nº colegiado.',
      },
      hasStateFilter: true,
    };
  }
}
