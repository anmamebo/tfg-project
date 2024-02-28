import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ListResponse,
  PaginatedResponse,
} from '@app/core/models/response/list-response.interface';
import { Treatment } from '@app/core/models/treatment.interface';
import { TreatmentService } from '@app/core/services/entities/treatment.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { GenericListCardComponent } from '@app/shared/components/generic-list-card/generic-list-card.component';

interface TreatmentFilters {
  statuses?: string[];
  startDate?: {
    from: string;
    to: string;
  };
  endDate?: {
    from: string;
    to: string;
  };
}

/**
 * Componente que representa una tarjeta de listado de tratamientos para el rol de paciente.
 */
@Component({
  selector: 'app-list-treatments-historical-patient-card',
  templateUrl: './list-treatments-historical-patient-card.component.html',
})
export class ListTreatmentsHistoricalPatientCardComponent extends GenericListCardComponent {
  /** Filtros */
  public filters: TreatmentFilters = {};

  /** Identificador del paciente */
  @Input() public patientId: string | null = null;

  constructor(
    private _treatmentService: TreatmentService,
    notificationService: NotificationService,
    route: ActivatedRoute
  ) {
    super(notificationService, route);
    this.urlSearch = false;
    this.sort.column = 'start_date';
    this.sort.order = 'desc';
  }

  /**
   * Obtiene los elementos correspondientes a una página específica y un término de búsqueda opcional.
   * @public
   * @returns {void}
   */
  public override getItems(): void {
    const filters = this._getFilters();

    this._treatmentService
      .getTreatmentsByPatient(filters, this.patientId)
      .subscribe({
        next: (response: ListResponse<Treatment>) => {
          const paginatedResponse = response as PaginatedResponse<Treatment>;
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
    let statuses: string[] = ['in_progress'];
    let startDateFrom: string | undefined = undefined;
    let startDateTo: string | undefined = undefined;
    let endDateFrom: string | undefined = undefined;
    let endDateTo: string | undefined = undefined;

    if (this.filters) {
      if (this.filters.statuses) {
        statuses = this.filters.statuses;
      }
      if (this.filters.startDate) {
        startDateFrom = this.filters.startDate.from;
        startDateTo = this.filters.startDate.to;
      }
      if (this.filters.endDate) {
        endDateFrom = this.filters.endDate.from;
        endDateTo = this.filters.endDate.to;
      }
    }

    return {
      statuses: statuses,
      page: this.entityData.page,
      numResults: this.entityData.numResults,
      searchTerm: this.entityData.search.search,
      paginate: true,
      state: this.filterState,
      sortBy: this.sort.column,
      sortOrder: this.sort.order,
      startDateFrom: startDateFrom,
      startDateTo: startDateTo,
      endDateFrom: endDateFrom,
      endDateTo: endDateTo,
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
