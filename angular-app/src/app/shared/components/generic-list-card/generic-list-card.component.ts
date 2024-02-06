import { Component, Input, OnInit } from '@angular/core';
import { EntityData } from 'src/app/core/models/entity-data.interface';
import {
  ListResponse,
  PaginatedResponse,
} from 'src/app/core/models/response/list-response.interface';
import { SortEvent } from 'src/app/core/models/sort-event.interface';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

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

  constructor(protected notificationService: NotificationService) {
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
    this.getItems(this.entityData.page);
  }

  /**
   * Filtra los elementos en función de un valor booleano o nulo y actualiza los elementos mostrados.
   * @public
   * @param {boolean | null} filterValue - Valor booleano o nulo para filtrar los elementos.
   * @returns {void}
   */
  public filterItems(filterValue: boolean | null): void {
    this.filterState = filterValue;
    this.getItems(this.entityData.page);
  }

  /**
   * Ordena los elementos utilizando un evento de clasificación y actualiza los elementos mostrados.
   * @public
   * @param {SortEvent} sortEvent - Evento de clasificación que contiene la información sobre la clasificación.
   * @returns {void}
   */

  public sortItems(sortEvent: SortEvent): void {
    this.sort = sortEvent;
    this.getItems(this.entityData.page);
  }

  /**
   * Cambia la página actual de elementos y actualiza los elementos mostrados en función del número de página proporcionado.
   * @public
   * @param {number} page - Número de página al que se desea navegar.
   * @returns {void}
   */
  public goToPage(page: number): void {
    this.entityData.page = page;
    this.getItems(this.entityData.page);
  }

  /**
   * Realiza una búsqueda utilizando el término proporcionado y actualiza los elementos mostrados en función de la página actual y el término de búsqueda.
   * @public
   * @param {string} searchTerm - Término de búsqueda utilizado para filtrar los elementos.
   * @returns {void}
   */
  public onSearchSubmitted(searchTerm: string): void {
    this.getItems(this.entityData.page, searchTerm);
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
    this.getItems(this.entityData.page);
  }

  /**
   * Obtiene los elementos de una página específica utilizando un servicio de datos, aplicando filtros de búsqueda, paginación y ordenamiento si se proporcionan.
   * @public
   * @param {number} page - Número de la página que se desea obtener.
   * @param {string} [searchTerm] - Término de búsqueda para filtrar los resultados (opcional).
   * @returns {void}
   */
  public getItems(page: number, searchTerm?: string): void {
    if (
      searchTerm != undefined &&
      searchTerm != this.entityData.search.search
    ) {
      this.entityData.search.search = searchTerm || '';
      page = 1;
      this.entityData.page = 1;
    }

    if (this.entityData.service == null) {
      return;
    }

    this.entityData.service
      .getItems({
        page: page,
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
          this.entityData.totalPages = Math.ceil(
            this.entityData.numItems / this.entityData.numResults
          );
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
          this.getItems(this.entityData.page);
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
