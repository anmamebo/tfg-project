import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Appointment,
  STATUS_BADGE_CLASSES,
  StatusBadgeClasses,
} from 'src/app/core/models/appointment.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente para la tarjeta de visualización de la información
 * de una cita en la página de visualización de una cita.
 */
@Component({
  selector: 'app-view-info-status-appointments-card',
  templateUrl: './view-info-status-appointments-card.component.html',
  providers: [AppointmentService],
})
export class ViewInfoStatusAppointmentsCardComponent {
  /** Cita que se visualizará */
  @Input() public appointment: Appointment | null = null;

  /** Evento para actualizar la cita */
  @Output() public refreshAppointment: EventEmitter<void> =
    new EventEmitter<void>();

  /** Classes de los badges de estado. */
  public statusBadgeClasses: StatusBadgeClasses = STATUS_BADGE_CLASSES;

  constructor(
    private _appointmentService: AppointmentService,
    private _notificationService: NotificationService
  ) {}

  /**
   * Actualiza el estado de la cita.
   * @public
   * @param {string} status - Nuevo estado para la cita.
   * @returns {void}
   */
  public updateStatus(status: string): void {
    if (!this.appointment) {
      this._notificationService.showErrorToast(
        'No se ha podido actualizar el estado de la cita.'
      );
      return;
    }

    this._appointmentService
      .updateStatus(this.appointment.id, status)
      .subscribe({
        next: (response: MessageResponse) => {
          this._notificationService.showSuccessToast(response.message);
          this.refreshAppointment.emit();
        },
        error: (error: any) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
  }
}
