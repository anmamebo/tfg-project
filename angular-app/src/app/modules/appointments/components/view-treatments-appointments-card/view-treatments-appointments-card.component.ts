import { Component, Input } from '@angular/core';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Appointment } from 'src/app/core/models/appointment.interface';
import {
  ListResponse,
  PaginatedResponse,
} from 'src/app/core/models/response/list-response.interface';
import { Treatment } from 'src/app/core/models/treatment.interface';
import { TreatmentService } from 'src/app/core/services/entities/treatment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { GenericListCardComponent } from 'src/app/shared/components/generic-list-card/generic-list-card.component';

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
    private _treatmentService: TreatmentService,
    notificationService: NotificationService,
    public readonly swalTargets: SwalPortalTargets
  ) {
    super(notificationService);
    this.entityData.numResults = 5;
  }

  /**
   * Obtiene los tratamientos relacionados con una cita específica para mostrarlos en la interfaz.
   * @public
   * @param {number} page - Página actual de la lista de tratamientos.
   * @param {string} [searchTerm] - Término de búsqueda opcional para filtrar los tratamientos.
   * @returns {void}
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

    this._treatmentService
      .getTreatmentsByAppointment(this.appointment.id, {
        page: page,
        numResults: this.entityData.numResults,
        paginate: true,
      })
      .subscribe({
        next: (response: ListResponse<Treatment>) => {
          const paginatedResponse = response as PaginatedResponse<Treatment>;
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
