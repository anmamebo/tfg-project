import { Component, Input } from '@angular/core';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

// Servicios
import { TreatmentService } from 'src/app/core/services/treatment.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Appointment } from 'src/app/core/models/appointment.model';

/**
 * Componente que representa una tarjeta de listado de tratamientos de una cita.
 */
@Component({
  selector: 'app-view-treatments-appointments-card',
  templateUrl: './view-treatments-appointments-card.component.html',
  providers: [TreatmentService],
})
export class ViewTreatmentsAppointmentsCardComponent extends GenericListCardComponent {
  /** Cita. */
  @Input() public appointment: Appointment | null = null;

  constructor(
    private treatmentService: TreatmentService,
    notificationService: NotificationService,
    public readonly swalTargets: SwalPortalTargets
  ) {
    super(notificationService);
    this.entityData.numResults = 5;
  }

  /**
   * Obtiene los tratamientos de una cita.
   *
   * @param page Número de página.
   * @param searchTerm Término de búsqueda.
   */
  public override getItems(page: number, searchTerm?: string): void {
    if (!this.appointment) return;

    if (
      searchTerm != undefined &&
      searchTerm != this.entityData.search.search
    ) {
      this.entityData.search.search = searchTerm || '';
      page = 1;
      this.entityData.page = 1;
    }

    this.treatmentService
      .getTreatmentsByAppointment(
        this.appointment.id,
        page,
        this.entityData.numResults,
        '',
        true
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
