import { Component, ViewChild } from '@angular/core';

import { breadcrumbGroupData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { GroupService } from 'src/app/core/services/entities/group.service';

// Modelos
import { EntityData } from 'src/app/core/models/entity-data.interface';

// Componentes
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

/**
 * Componente para la página de grupos.
 */
@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
})
export class GroupPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Grupos (Roles)';

  /** Descripción de la página. */
  public pageDescription: string =
    'Aquí puedes ver los diferentes grupos (roles).';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbGroupData;

  /** Datos de la entidad. */
  public entityData: EntityData;

  /** Referencia al componente hijo `ListGroupCardComponent`. */
  @ViewChild(GenericListCardComponent, { static: false })
  listGroupCardComponent?: GenericListCardComponent;

  constructor(private _groupService: GroupService) {
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: 'Grupos',
      entitySingular: 'Grupo',
      columns: [
        { header: 'ID', field: 'id' },
        { header: 'NOMBRE', field: 'name' },
      ],
      create: {
        hasCreate: false,
      },
      actions: {
        hasActions: true,
        actions: {
          show: '/autorizacion/grupos',
          edit: '/autorizacion/grupos/editar',
        },
      },
      service: this._groupService,
      items: null,
      page: 1,
      totalPages: 1,
      numItems: 0,
      numResults: 10,
      search: {
        hasSearch: false,
      },
      hasStateFilter: false,
    };
  }

  /**
   * Actualiza la lista de grupos.
   * @public
   * @returns {void}
   */
  public updateGroupList(): void {
    if (!this.listGroupCardComponent) {
      return;
    }
    this.listGroupCardComponent.getItems(this.entityData.page);
  }
}
