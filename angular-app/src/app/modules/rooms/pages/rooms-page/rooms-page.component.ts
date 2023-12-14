import { Component } from '@angular/core';

import { breadcrumbRoomsData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { RoomService } from 'src/app/core/services/room.service';

// Modelos
import { entityData } from 'src/app/core/models/entityData.model';

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
  public entityData: entityData;

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
      },
      actions: {
        hasActions: true,
        actions: {
          show: '/salas',
          edit: '/salas/editar',
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
      },
      hasStateFilter: true,
    };
  }
}
