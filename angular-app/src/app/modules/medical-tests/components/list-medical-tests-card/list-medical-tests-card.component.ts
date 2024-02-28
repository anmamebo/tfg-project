import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalTest } from '@app/core/models/medical-test.interface';
import {
  ListResponse,
  PaginatedResponse,
} from '@app/core/models/response/list-response.interface';
import { MedicalTestService } from '@app/core/services/entities/medicaltest.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { GenericListCardComponent } from '@app/shared/components/generic-list-card/generic-list-card.component';

interface MedicalTestFilters {
  completed?: any;
  date?: {
    from: string;
    to: string;
  };
}

/**
 * Componente que representa una tarjeta de listado de pruebas médicas.
 */
@Component({
  selector: 'app-list-medical-tests-card',
  templateUrl: './list-medical-tests-card.component.html',
})
export class ListMedicalTestsCardComponent extends GenericListCardComponent {
  /** Filtros */
  public filters: MedicalTestFilters = {};

  /** Identificador del paciente */
  @Input() public patientId: string | null = null;

  constructor(
    private _medicalTestService: MedicalTestService,
    notificationService: NotificationService,
    route: ActivatedRoute
  ) {
    super(notificationService, route);
    this.urlSearch = false;
  }

  /**
   * Obtiene pruebas médicas de pacientes con estados específicos y opciones de búsqueda.
   * @returns {void}
   * @public
   */
  public override getItems(): void {
    const filters = this._getFilters();

    this._medicalTestService
      .getMedicalTestsByPatient(filters, this.patientId)
      .subscribe({
        next: (response: ListResponse<MedicalTest>) => {
          const paginatedResponse = response as PaginatedResponse<MedicalTest>;
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
   * Obtiene los filtros seleccionados.
   * @returns {any} Los filtros seleccionados.
   */
  private _getFilters(): any {
    let completed: 'true' | 'false' | undefined = undefined;
    let dateFrom: string | undefined = undefined;
    let dateTo: string | undefined = undefined;

    if (this.filters) {
      if (this.filters.completed) {
        completed = this.filters.completed;
      }

      if (this.filters.date) {
        dateFrom = this.filters.date.from;
        dateTo = this.filters.date.to;
      }
    }

    return {
      completed: completed,
      page: this.entityData.page,
      numResults: this.entityData.numResults,
      searchTerm: this.entityData.search.search,
      paginate: true,
      state: this.filterState,
      sortBy: this.sort.column,
      sortOrder: this.sort.order,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
  }

  /**
   * Aplica los filtros seleccionados.
   * @param {any} event - Evento con los filtros seleccionados.
   * @returns {void}
   * @public
   */
  public applyFilters(event: any): void {
    this.filters = event;
    this.entityData.page = 1;
    this.getItems();
  }
}
