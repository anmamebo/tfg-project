import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '@app/core/models/appointment.interface';
import {
  ListResponse,
  PaginatedResponse,
} from '@app/core/models/response/list-response.interface';
import { Treatment } from '@app/core/models/treatment.interface';
import { TreatmentService } from '@app/core/services/entities/treatment.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { GenericListCardComponent } from '@app/shared/components/generic-list-card/generic-list-card.component';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

/**
 * Componente que representa una tarjeta de listado de tratamientos de una cita.
 */
@Component({
  selector: 'app-view-treatments-appointments-doctor-card',
  templateUrl: './view-treatments-appointments-doctor-card.component.html',
  providers: [TreatmentService],
})
export class ViewTreatmentsAppointmentsDoctorCardComponent extends GenericListCardComponent {
  /** Cita. */
  @Input() public appointment: Appointment | null = null;

  constructor(
    private _treatmentService: TreatmentService,
    notificationService: NotificationService,
    route: ActivatedRoute,
    public readonly swalTargets: SwalPortalTargets
  ) {
    super(notificationService, route);
    this.urlSearch = false;
    this.entityData.numResults = 5;
  }

  /**
   * Obtiene los tratamientos relacionados con una cita específica para mostrarlos en la interfaz.
   * @public
   * @returns {void}
   */
  public override getItems(): void {
    if (!this.appointment) return;

    this._treatmentService
      .getTreatmentsByAppointment(this.appointment.id, {
        page: this.entityData.page,
        numResults: this.entityData.numResults,
        paginate: true,
      })
      .subscribe({
        next: (response: ListResponse<Treatment>) => {
          const paginatedResponse = response as PaginatedResponse<Treatment>;
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
