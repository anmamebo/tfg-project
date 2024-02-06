import { Component } from '@angular/core';
import { breadcrumbRoomsData } from 'src/app/core/constants/breadcrumb-data.constants';
import { ROLES } from 'src/app/core/constants/roles.constants';
import { EntityData } from 'src/app/core/models/entity-data.interface';
import { RoomService } from 'src/app/core/services/entities/room.service';

/**
 * Componente para la página de listado de salas.
 */
@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
})
export class RoomsPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Salas';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes ver las salas.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbRoomsData;

  /** Datos de la entidad. */
  public entityData: EntityData;

  constructor(private _roomService: RoomService) {
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: 'Salas',
      entitySingular: 'Sala',
      columns: [
        { header: 'NOMBRE', field: 'name' },
        { header: 'DESCRIPCIÓN', field: 'description' },
        { header: 'DEPARTAMENTO', field: 'department.name' },
        { header: 'LOCALIZACIÓN', field: 'location' },
      ],
      create: {
        hasCreate: true,
        createText: 'Crear Sala',
        create: '/salas/crear',
        roles: [ROLES.ADMIN],
      },
      actions: {
        hasActions: true,
        actions: {
          show: {
            url: '/salas',
            roles: [ROLES.ADMIN, ROLES.DOCTOR],
          },
          edit: {
            url: '/salas/editar',
            roles: [ROLES.ADMIN],
          },
          delete: {
            roles: [ROLES.ADMIN],
          },
        },
      },
      service: this._roomService,
      items: null,
      page: 1,
      totalPages: 1,
      numItems: 0,
      numResults: 10,
      search: {
        hasSearch: true,
        search: '',
        searchInfoTooltip:
          'Buscar salas por id, nombre, tipo, localización, nombre de departamento o capacidad.',
      },
      hasStateFilter: true,
    };
  }
}
