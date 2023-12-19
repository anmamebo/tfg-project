import { Component } from '@angular/core';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

// Servicios
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente que representa una tarjeta de listado de citas para el rol de paciente.
 */
@Component({
  selector: 'app-list-appointments-patient-card',
  templateUrl: './list-appointments-patient-card.component.html',
})
export class ListAppointmentsPatientCardComponent extends GenericListCardComponent {
  constructor(
    private _appointmentService: AppointmentService,
    notificationService: NotificationService
  ) {
    super(notificationService);
  }

  /**
   * Obtiene las citas.
   *
   * @param page Número de página.
   * @param searchTerm Término de búsqueda.
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
      .getAppointmentsByPatient(
        ['pending', 'scheduled', 'rescheduled', 'in_progress'],
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
}
