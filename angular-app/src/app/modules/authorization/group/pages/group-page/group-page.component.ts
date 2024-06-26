import { Component, ViewChild } from '@angular/core';
import { breadcrumbGroupData } from '@app/core/constants/breadcrumb-data.constants';
import { ROLES } from '@app/core/constants/roles.constants';
import { EntityData } from '@app/core/models/entity-data.interface';
import { GroupService } from '@app/core/services/entities/group.service';
import { GenericListCardComponent } from '@app/shared/components/generic-list-card/generic-list-card.component';

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
          show: {
            url: '/autorizacion/grupos',
            roles: [ROLES.ADMIN],
          },
          edit: {
            url: '/autorizacion/grupos/editar',
            roles: [ROLES.ADMIN],
          },
          delete: {
            roles: [ROLES.ADMIN],
          },
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
    this.listGroupCardComponent.getItems();
  }
}
