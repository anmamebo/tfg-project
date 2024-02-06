import { Component } from '@angular/core';
import { breadcrumbMedicalSpecialtiesData } from 'src/app/core/constants/breadcrumb-data.constants';
import { ROLES } from 'src/app/core/constants/roles.constants';
import { EntityData } from 'src/app/core/models/entity-data.interface';
import { MedicalspecialtyService } from 'src/app/core/services/entities/medicalspecialty.service';

/**
 * Componente para la página de listado de especialidades médicas.
 */
@Component({
  selector: 'app-medical-specialties-page',
  templateUrl: './medical-specialties-page.component.html',
})
export class MedicalSpecialtiesPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Especialidades médicas';

  /** Descripción de la página. */
  public pageDescription: string =
    'Aquí puedes ver las especialidades médicas.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbMedicalSpecialtiesData;

  /** Datos de la entidad. */
  public entityData: EntityData;

  constructor(private _medicalSpecialtyService: MedicalspecialtyService) {
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: 'Especialidades médicas',
      entitySingular: 'Especialidad médica',
      columns: [
        { header: 'NOMBRE', field: 'name' },
        { header: 'DESCRIPCIÓN', field: 'description' },
      ],
      create: {
        hasCreate: true,
        createText: 'Crear Especialidad Médica',
        create: '/especialidades-medicas/crear',
        roles: [ROLES.ADMIN],
      },
      actions: {
        hasActions: true,
        actions: {
          show: {
            url: '/especialidades-medicas',
            roles: [ROLES.ADMIN, ROLES.DOCTOR],
          },
          edit: {
            url: '/especialidades-medicas/editar',
            roles: [ROLES.ADMIN],
          },
          delete: {
            roles: [ROLES.ADMIN],
          },
        },
      },
      service: this._medicalSpecialtyService,
      items: null,
      page: 1,
      totalPages: 1,
      numItems: 0,
      numResults: 10,
      search: {
        hasSearch: true,
        search: '',
        searchInfoTooltip:
          'Buscar especialidades por id, nombre o descripción.',
      },
      hasStateFilter: true,
    };
  }
}
