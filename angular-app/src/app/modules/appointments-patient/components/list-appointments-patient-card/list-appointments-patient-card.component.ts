import { Component, Input } from '@angular/core';
import { Appointment } from 'src/app/core/models/appointment.interface';
import {
  ListResponse,
  PaginatedResponse,
} from 'src/app/core/models/response/list-response.interface';
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

/**
 * Componente que representa una tarjeta de listado de citas para el rol de paciente.
 */
@Component({
  selector: 'app-list-appointments-patient-card',
  templateUrl: './list-appointments-patient-card.component.html',
})
export class ListAppointmentsPatientCardComponent extends GenericListCardComponent {
  /** Filtros */
  public filters: any = null;

  /** Identificador del paciente */
  @Input() public patientId: string | null = null;

  constructor(
    private _appointmentService: AppointmentService,
    notificationService: NotificationService
  ) {
    super(notificationService);
  }

  /**
   * Obtiene citas de pacientes con ciertos estados y opciones de búsqueda.
   * @public
   * @param {number} page - Número de la página actual.
   * @returns {void}
   */
  public override getItems(page: number): void {
    let statuses: string[] = [
      'pending',
      'scheduled',
      'rescheduled',
      'in_progress',
    ];
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
      .getAppointmentsByPatient(
        {
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
        },
        this.patientId
      )
      .subscribe({
        next: (response: ListResponse<Appointment>) => {
          const paginatedResponse = response as PaginatedResponse<Appointment>;
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
