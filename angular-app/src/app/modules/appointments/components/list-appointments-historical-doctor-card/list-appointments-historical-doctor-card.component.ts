import { Component } from '@angular/core';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

// Servicios
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa una tarjeta de listado de historico de citas
 * para el rol de doctor.
 */
@Component({
  selector: 'app-list-appointments-historical-doctor-card',
  templateUrl: './list-appointments-historical-doctor-card.component.html',
})
export class ListAppointmentsHistoricalDoctorCardComponent extends GenericListCardComponent {
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
   * Obtiene elementos para mostrar en la página, teniendo en cuenta la paginación y los criterios de búsqueda.
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

    const statusMapping: { [key: string]: string[] } = {
      all: ['completed', 'no_show', 'cancelled'],
      completed: ['completed'],
      no_show: ['no_show'],
      cancelled: ['cancelled'],
    };

    let statuses: string[] = statusMapping[this.filter] || [];

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
}
