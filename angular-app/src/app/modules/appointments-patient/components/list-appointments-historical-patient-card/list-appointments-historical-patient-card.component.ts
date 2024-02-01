import { Component } from '@angular/core';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

// Servicios
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa una tarjeta de listado de citas para el rol de paciente.
 */
@Component({
  selector: 'app-list-appointments-historical-patient-card',
  templateUrl: './list-appointments-historical-patient-card.component.html',
})
export class ListAppointmentsHistoricalPatientCardComponent extends GenericListCardComponent {
  /** Filtros */
  public filters: any = null;

  constructor(
    private _appointmentService: AppointmentService,
    notificationService: NotificationService
  ) {
    super(notificationService);
    this.sort.column = 'request_date';
    this.sort.order = 'desc';
  }

  /**
   * Obtiene citas de pacientes con estados específicos y opciones de búsqueda.
   * @public
   * @param {number} page - Número de página actual.
   * @param {string} [searchTerm] - Término de búsqueda opcional.
   * @returns {void}
   */
  public override getItems(page: number, searchTerm?: string): void {
    if (
      searchTerm != undefined &&
      searchTerm != this.entityData.search.search
    ) {
      this.entityData.search.search = searchTerm || '';
      page = 1;
      this.entityData.page = 1;
    }

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

    this._appointmentService
      .getAppointmentsByPatient({
        statuses: statuses,
        types: types,
        specialties: specialties,
        page: page,
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
      })
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
   * Aplica los filtros seleccionados.
   * @param {any} event - Evento con los filtros seleccionados.
   * @returns {void}
   * @public
   */
  public applyFilters(event: any): void {
    this.filters = event;
    this.entityData.page = 1;
    this.getItems(1);
  }
}
