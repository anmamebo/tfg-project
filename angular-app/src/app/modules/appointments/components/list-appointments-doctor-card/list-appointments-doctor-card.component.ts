import { Component } from '@angular/core';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

// Servicios
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

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

  constructor(
    private _appointmentService: AppointmentService,
    notificationService: NotificationService
  ) {
    super(notificationService);
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

    this._appointmentService
      .getAppointmentsByDoctor({
        statuses: ['scheduled', 'rescheduled', 'in_progress'],
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
