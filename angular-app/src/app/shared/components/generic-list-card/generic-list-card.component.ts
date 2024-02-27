import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityData } from '@app/core/models/entity-data.interface';
import {
  ListResponse,
  PaginatedResponse,
} from '@app/core/models/response/list-response.interface';
import { SortEvent } from '@app/core/models/sort-event.interface';
import { NotificationService } from '@app/core/services/notifications/notification.service';

/**
 * Componente que representa una tarjeta de listado genérica.
 */
@Component({
  selector: 'app-generic-list-card',
  templateUrl: './generic-list-card.component.html',
})
export class GenericListCardComponent implements OnInit {
  /** Datos de la entidad. */
  @Input() public entityData: EntityData;

  /** Filtro de estado. */
  public filterState: boolean | null = true;

  /** Objeto con los datos de ordenación. */
  public sort: SortEvent = {
    column: '',
    order: '',
  };

  /** Indica si coge los parámetros de la url para la búsqueda. */
  public urlSearch: boolean = true;

  constructor(
    protected notificationService: NotificationService,
    protected route: ActivatedRoute
  ) {
    this.entityData = {
      title: {
        hasTitle: false,
      },
      entityPlural: '',
      entitySingular: '',
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
      numResults: 10,
      search: {
        hasSearch: false,
      },
      hasStateFilter: true,
    };
  }

  ngOnInit(): void {
    if (this.entityData.search.hasSearch && this.urlSearch) {
      this._setQueryParamFromUrl();
    }

    this.getItems();
  }

  /**
   * Obtiene el término de búsqueda de la URL y lo establece en la variable de búsqueda de la entidad.
   * @private
   * @returns {void}
   */
  private _setQueryParamFromUrl(): void {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['q'];
      if (searchTerm) {
        this.entityData.search.search = searchTerm;
      }
    });
  }

  /**
   * Filtra los elementos en función de un valor booleano o nulo y actualiza los elementos mostrados.
   * @public
   * @param {boolean | null} filterValue - Valor booleano o nulo para filtrar los elementos.
   * @returns {void}
   */
  public filterItems(filterValue: boolean | null): void {
    this.filterState = filterValue;
    this.entityData.page = 1;
    this.getItems();
  }

  /**
   * Ordena los elementos utilizando un evento de clasificación y actualiza los elementos mostrados.
   * @public
   * @param {SortEvent} sortEvent - Evento de clasificación que contiene la información sobre la clasificación.
   * @returns {void}
   */

  public sortItems(sortEvent: SortEvent): void {
    this.sort = sortEvent;
    this.getItems();
  }

  /**
   * Cambia la página actual de elementos y actualiza los elementos mostrados en función del número de página proporcionado.
   * @public
   * @param {number} page - Número de página al que se desea navegar.
   * @returns {void}
   */
  public goToPage(page: number): void {
    this.entityData.page = page;
    this.getItems();
  }

  /**
   * Realiza una búsqueda utilizando el término proporcionado y actualiza los elementos mostrados en función de la página actual y el término de búsqueda.
   * @public
   * @param {string} searchTerm - Término de búsqueda utilizado para filtrar los elementos.
   * @returns {void}
   */
  public onSearchSubmitted(searchTerm: string): void {
    this.entityData.search.search = searchTerm;
    this.entityData.page = 1;
    this.getItems();
  }

  /**
   * Actualiza el número de resultados mostrados por página y vuelve a obtener los elementos con la nueva configuración de paginación.
   * @public
   * @param {number} elementsPerPage - Número de elementos que se mostrarán por página.
   * @returns {void}
   */
  public onEntriesPerPageChanged(elementsPerPage: number): void {
    this.entityData.numResults = elementsPerPage;
    this.entityData.page = 1;
    this.getItems();
  }

  /**
   * Obtiene los elementos de una página específica utilizando un servicio de datos, aplicando filtros de búsqueda, paginación y ordenamiento si se proporcionan.
   * @public
   * @returns {void}
   */
  public getItems(): void {
    if (this.entityData.service == null) {
      return;
    }

    this.entityData.service
      .getItems({
        page: this.entityData.page,
        numResults: this.entityData.numResults,
        searchTerm: this.entityData.search.search,
        paginated: true,
        state: this.filterState,
        sortBy: this.sort.column,
        sortOrder: this.sort.order,
      })
      .subscribe({
        next: (response: ListResponse<any>) => {
          const paginatedResponse = response as PaginatedResponse<any>;
          this.entityData.items = paginatedResponse.results;
          this.entityData.numItems = paginatedResponse.count;
          this.entityData.totalPages = paginatedResponse.total_pages;
        },
        error: (error: any) => {
          this.notificationService.showErrorToast(error.message);
        },
      });
  }

  /**
   * Elimina un elemento mediante su identificador, mostrando un diálogo de confirmación antes de proceder.
   * @public
   * @param {string} id - Identificador del elemento que se desea eliminar.
   * @returns {void}
   */
  public delete(id: string): void {
    this.notificationService.showConfirmDeleteDialog(() => {
      if (this.entityData.service == null) {
        this.notificationService.showErrorToast(
          'No se ha podido eliminar el elemento.'
        );
        return;
      }
      this.entityData.service.delete(id).subscribe({
        next: () => {
          this.getItems();
        },
        error: () => {
          this.notificationService.showErrorToast(
            'No se ha podido eliminar el elemento.'
          );
        },
      });
    });
  }
}
