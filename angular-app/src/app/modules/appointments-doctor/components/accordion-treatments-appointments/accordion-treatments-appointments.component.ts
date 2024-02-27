import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  STATUS_BADGE_CLASSES,
  StatusBadgeClasses,
  Treatment,
} from '@app/core/models/treatment.interface';
import { TreatmentService } from '@app/core/services/entities/treatment.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

/**
 * Componente que representa un acordeón de tratamientos de una cita.
 */
@Component({
  selector: 'app-accordion-treatments-appointments',
  templateUrl: './accordion-treatments-appointments.component.html',
  providers: [TreatmentService],
})
export class AccordionTreatmentsAppointmentsComponent {
  /** Tratamientos. */
  @Input() public treatments: Treatment[] | null = null;

  /** Classes de los badges de estado. */
  public statusBadgeClasses: StatusBadgeClasses = STATUS_BADGE_CLASSES;

  /** Evento para refrescar los tratamientos. */
  @Output() public refreshTreatments: EventEmitter<void> = new EventEmitter();

  constructor(
    private _treatmentService: TreatmentService,
    private _notificationService: NotificationService,
    public readonly swalTargets: SwalPortalTargets
  ) {}

  /**
   * Elimina un tratamiento según su ID.
   * Muestra un diálogo de confirmación antes de realizar la eliminación.
   * @param {string} id - El ID del tratamiento que se desea eliminar.
   * @returns {void}
   * @public
   */
  public deleteTreatment(id: string): void {
    this._notificationService.showConfirmDeleteDialog(() => {
      this._treatmentService.deleteTreatment(id).subscribe({
        next: () => {
          this.refreshTreatments.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido eliminar el tratamiento.'
          );
        },
      });
    });
  }
}
