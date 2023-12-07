import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Servicios
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import {
  Appointment,
  StatusBadgeClasses,
  STATUS_BADGE_CLASSES,
} from 'src/app/core/models/appointment.model';

/**
 * Componente que representa una tarjeta de visualización de citas para el rol de paciente.
 */
@Component({
  selector: 'app-view-appointments-patient-card',
  templateUrl: './view-appointments-patient-card.component.html',
  styleUrls: ['./view-appointments-patient-card.component.scss'],
  providers: [AppointmentService],
})
export class ViewAppointmentsPatientCardComponent implements OnInit {
  /** Cita. */
  @Input() public appointment: Appointment | null = null;

  /** Título de la tarjeta. */
  public cardTitle: string = 'Cita sin fecha asignada';

  /** Classes de los badges de estado. */
  public statusBadgeClasses: StatusBadgeClasses = STATUS_BADGE_CLASSES;

  /** Evento para refrescar la lista de citas. */
  @Output() public appointmentCancelled: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(
    private appointmentService: AppointmentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.generateTitle();
  }

  /**
   * Cancela la cita.
   */
  public cancelAppointment() {
    this.notificationService.showConfirmGenericDialog(
      '¿Estás seguro de que quieres cancelar la cita?',
      'Esta acción no se puede deshacer.',
      'Confirmar cancelación',
      '¡Cita cancelada!',
      'La cita ha sido cancelada correctamente.',
      'Cancelar',
      () => {
        this.appointmentService
          .updateStatus(this.appointment!.id, 'cancelled')
          .subscribe({
            next: (response: any) => {
              this.appointmentCancelled.emit();
            },
            error: (error: any) => {
              this.notificationService.showErrorToast(error.message);
            },
          });
      }
    );
  }

  /**
   * Genera el título de la tarjeta.
   */
  private generateTitle() {
    if (
      this.appointment &&
      this.appointment.schedule &&
      this.appointment.doctor &&
      this.appointment.doctor.user
    ) {
      const appointmentDate = new Date(this.appointment.schedule.start_time);
      const date = format(appointmentDate, 'HH:mm - dd, MMMM yyyy', {
        locale: es,
      });
      this.cardTitle =
        date +
        ' | Dr/a ' +
        this.appointment.doctor.user.name +
        ' ' +
        this.appointment.doctor.user.last_name;
    }
  }
}