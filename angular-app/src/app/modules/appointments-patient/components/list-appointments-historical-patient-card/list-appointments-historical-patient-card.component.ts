import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '@app/core/models/appointment.interface';
import {
  ListResponse,
  PaginatedResponse,
} from '@app/core/models/response/list-response.interface';
import { AppointmentService } from '@app/core/services/entities/appointment.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { GenericListCardComponent } from '@app/shared/components/generic-list-card/generic-list-card.component';

interface AppointmentFilters {
  statuses?: string[];
  types?: string[];
  specialties?: string[];
  date?: {
    from: string;
    to: string;
  };
  requestDate?: {
    from: string;
    to: string;
  };
}

/**
 * Componente que representa una tarjeta de listado de citas para el rol de paciente.
 */
@Component({
  selector: 'app-list-appointments-historical-patient-card',
  templateUrl: './list-appointments-historical-patient-card.component.html',
})
export class ListAppointmentsHistoricalPatientCardComponent extends GenericListCardComponent {
  /** Filtros */
  public filters: AppointmentFilters = {};

  /** Identificador del paciente */
  @Input() public patientId: string | null = null;

  constructor(
    private _appointmentService: AppointmentService,
    notificationService: NotificationService,
    route: ActivatedRoute
  ) {
    super(notificationService, route);
    this.urlSearch = false;
    this.sort.column = 'request_date';
    this.sort.order = 'desc';
  }

  /**
   * Obtiene citas de pacientes con estados específicos y opciones de búsqueda.
   * @public
   * @returns {void}
   */
  public override getItems(): void {
    const filters = this._getFilters();

    this._appointmentService
      .getAppointmentsByPatient(filters, this.patientId)
      .subscribe({
        next: (response: ListResponse<Appointment>) => {
          const paginatedResponse = response as PaginatedResponse<Appointment>;
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
    let statuses: string[] = ['completed', 'no_show', 'cancelled'];
    let types: string[] | undefined = undefined;
    let specialties: string[] | undefined = undefined;
    let scheduleStartTimeFrom: string | undefined = undefined;
    let scheduleStartTimeTo: string | undefined = undefined;
    let requestDateFrom: string | undefined = undefined;
    let requestDateTo: string | undefined = undefined;

    if (this.filters) {
      if (this.filters.statuses) {
        statuses = this.filters.statuses;
      }
      if (this.filters.types) {
        types = this.filters.types;
      }
      if (this.filters.specialties) {
        specialties = this.filters.specialties;
      }
      if (this.filters.date) {
        scheduleStartTimeFrom = this.filters.date.from;
        scheduleStartTimeTo = this.filters.date.to;
      }
      if (this.filters.requestDate) {
        requestDateFrom = this.filters.requestDate.from;
        requestDateTo = this.filters.requestDate.to;
      }
    }
    return {
      statuses: statuses,
      types: types,
      specialtiees: specialties,
      page: this.entityData.page,
      numResults: this.entityData.numResults,
      searchTerm: this.entityData.search.search,
      paginate: true,
      state: this.filterState,
      sortBy: this.sort.column,
      sortOrder: this.sort.order,
      scheduleStartTimeFrom: scheduleStartTimeFrom,
      scheduleStartTimeTo: scheduleStartTimeTo,
      requestDateFrom: requestDateFrom,
      requestDateTo: requestDateTo,
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
