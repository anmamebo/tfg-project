import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/core/models/appointment.interface';
import {
  ListResponse,
  PaginatedResponse,
} from 'src/app/core/models/response/list-response.interface';
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

/**
 * Componente que representa una tarjeta de listado de citas para el rol de doctor.
 */
@Component({
  selector: 'app-list-appointments-doctor-card',
  templateUrl: './list-appointments-doctor-card.component.html',
  providers: [AppointmentService],
})
export class ListAppointmentsDoctorCardComponent extends GenericListCardComponent {
  /** Columnas de la tabla. */
  public columns: any[] = [
    { header: 'PACIENTE', field: 'patient.user.name' },
    { header: 'TIPO', field: 'type' },
    { header: 'ESTADO', field: 'status' },
    { header: 'MOTIVO', field: 'reason' },
    { header: 'FECHA', field: 'schedule.start_time' },
  ];

  /** Filtro de estado. */
  public filter: string = 'all';

  constructor(
    private _appointmentService: AppointmentService,
    notificationService: NotificationService,
    route: ActivatedRoute
  ) {
    super(notificationService, route);
  }

  /**
   * Filtra elementos según el valor del filtro.
   * @public
   * @param {string} filterValue - Valor del filtro.
   * @returns {void}
   */
  public filterElements(filterValue: string): void {
    this.filter = filterValue;
    this.getItems();
  }

  /**
   * Obtiene elementos para mostrar en la página, según la paginación y los criterios de búsqueda.
   * @public
   * @returns {void}
   */
  public override getItems(): void {
    const statusMappings: { [key: string]: string[] } = {
      all: ['scheduled', 'rescheduled', 'in_progress'],
      scheduled: ['scheduled'],
      rescheduled: ['rescheduled'],
      in_progress: ['in_progress'],
    };

    let statuses: string[] = statusMappings[this.filter] || [];

    this._appointmentService
      .getAppointmentsByDoctor({
        statuses: statuses,
        page: this.entityData.page,
        numResults: this.entityData.numResults,
        searchTerm: this.entityData.search.search,
        paginate: true,
        state: this.filterState,
        sortBy: this.sort.column,
        sortOrder: this.sort.order,
      })
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
}
