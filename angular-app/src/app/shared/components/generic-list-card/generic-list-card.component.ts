import { Component, Input, OnInit } from '@angular/core';

// Servicios
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { entityData } from 'src/app/core/models/entityData.model';
import { SortEvent } from 'src/app/core/models/sortEvent.model';

/**
 * Componente que representa una tarjeta de listado genérica.
 */
@Component({
  selector: 'app-generic-list-card',
  templateUrl: './generic-list-card.component.html',
})
export class GenericListCardComponent implements OnInit {
  /** Datos de la entidad. */
  @Input() public entityData: entityData;

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
   * Filtra los elementos de la entidad.
   * @param filterValue Valor del filtro.
   */
  public filterItems(filterValue: boolean | null) {
    this.filterState = filterValue;
    this.getItems(this.entityData.page);
  }

  /**
   * Ordena los elementos de la entidad.
   * @param sortEvent Evento de ordenación.
   */
  public sortItems(sortEvent: SortEvent): void {
    this.sort = sortEvent;
    this.getItems(this.entityData.page);
  }

  /**
   * Obtiene los elementos de la entidad de la página indicada.
   * @param page Número de página.
   */
  public goToPage(page: number): void {
    this.entityData.page = page;
    this.getItems(this.entityData.page);
  }

  /**
   * Obtiene los elementos de la entidad por el término de búsqueda.
   * @param searchTerm Término de búsqueda.
   */
  public onSearchSubmitted(searchTerm: string): void {
    this.getItems(this.entityData.page, searchTerm);
  }

  /**
   * Obtiene los elementos de la entidad con el número de elementos por página indicado.
   * @param elementsPerPage Número de elementos por página.
   */
  public onEntriesPerPageChanged(elementsPerPage: number): void {
    this.entityData.numResults = elementsPerPage;
    this.entityData.page = 1;
    this.getItems(this.entityData.page);
  }

  /**
   * Obtiene los elementos de la entidad.
   * @param page Número de página.
   * @param searchTerm Término de búsqueda.
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
      .getItems(
        page,
        this.entityData.numResults,
        this.entityData.search.search,
        true,
        this.filterState,
        this.sort.column,
        this.sort.order
      )
      .subscribe({
        next: (response: any) => {
          this.entityData.items = response.results;
          this.entityData.numItems = response.count;
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
   * Elimina un elemento de la entidad.
   * @param id ID del elemento.
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
