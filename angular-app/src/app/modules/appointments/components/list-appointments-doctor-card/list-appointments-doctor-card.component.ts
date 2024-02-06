import { Component } from '@angular/core';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

// Servicios
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import {
  ListResponse,
  PaginatedResponse,
} from 'src/app/core/models/response/list-response.interface';
import { Appointment } from 'src/app/core/models/appointment.interface';

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
    notificationService: NotificationService
  ) {
    super(notificationService);
  }

  /**
   * Filtra elementos según el valor del filtro.
   * @public
   * @param {string} filterValue - Valor del filtro.
   * @returns {void}
   */
  public filterElements(filterValue: string): void {
    this.filter = filterValue;
    this.getItems(this.entityData.page);
  }

  /**
   * Obtiene elementos para mostrar en la página, según la paginación y los criterios de búsqueda.
   * @public
   * @param {number} page - Número de página actual.
   * @param {string} [searchTerm] - Término de búsqueda opcional para filtrar elementos.
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
        page: page,
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
          this.entityData.totalPages = Math.ceil(
            this.entityData.numItems / this.entityData.numResults
          );
        },
        error: (error: any) => {
          this.notificationService.showErrorToast(error.message);
        },
      });
  }
}
