import { Component } from '@angular/core';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

// Servicios
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { NotificationService } from 'src/app/core/services/notification.service';

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
    private appointmentService: AppointmentService,
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
      this.entityData.search.search = searchTerm ? searchTerm : '';
      page = 1;
      this.entityData.page = 1;
    }

    this.appointmentService
      .getAppointmentsByDoctor(
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
