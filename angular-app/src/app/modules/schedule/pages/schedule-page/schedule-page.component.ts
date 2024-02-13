import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent } from 'angular-calendar';
import { breadcrumbScheduleData } from 'src/app/core/constants/breadcrumb-data.constants';
import { Appointment } from 'src/app/core/models/appointment.interface';
import { ListResponse } from 'src/app/core/models/response/list-response.interface';
import { CustomDateFormatter } from 'src/app/core/providers/custom-date-formatter.provider';
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { BaseCalendarComponent } from 'src/app/shared/components/base-calendar/base-calendar.component';

/**
 * Componente que representa la página de mi horario
 */
@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  providers: [
    AppointmentService,
    DatePipe,
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter },
  ],
})
export class SchedulePageComponent
  extends BaseCalendarComponent
  implements OnInit
{
  /** Título de la página. */
  public pageTitle: string = 'Mi horario';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes consultar tu horario.';

  /** Datos del breadcrumb. */
  public breadcrumbData = breadcrumbScheduleData;

  constructor(
    private _appointmentService: AppointmentService,
    private _notificationService: NotificationService,
    private _datePipe: DatePipe,
    _cdr: ChangeDetectorRef
  ) {
    super(_cdr);
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  /**
   * Obtiene el horario asociado a un doctor y actualiza los eventos en la interfaz.
   * @public
   * @returns {void}
   */
  public getAppointments(): void {
    this._appointmentService
      .getAppointmentsByDoctor({
        statuses: ['scheduled', 'in_progress', 'completed', 'rescheduled'],
      })
      .subscribe({
        next: (response: ListResponse<Appointment>) => {
          if (Array.isArray(response)) {
            this.events = this._formatData(response);
            this._cdr.detectChanges();
          }
        },
        error: (error) => {
          this._notificationService.showErrorToast(error.message);
        },
      });
  }

  /**
   * Formatea los datos de las citas para su visualización en el calendario.
   * @private
   * @param {Appointment[]} appointments - Lista de citas a formatear.
   * @returns {CalendarEvent[]} - Lista de eventos formateados para el calendario.
   */
  private _formatData(appointments: Appointment[]): CalendarEvent[] {
    return appointments.map((appointment: Appointment) => {
      const scheduleStartTime = appointment.schedule?.start_time;
      const patientName = appointment.patient?.user?.name;
      const patientLastName = appointment.patient?.user?.last_name;
      const roomName = appointment.room?.name;
      const roomLocation = appointment.room?.location;

      const titleParts: string[] = [];

      if (scheduleStartTime) {
        titleParts.push(
          this._datePipe.transform(scheduleStartTime, 'HH:mm') || ''
        );
      }

      if (patientName && patientLastName) {
        titleParts.push(`${patientName} ${patientLastName}`);
      }

      if (roomName && roomLocation) {
        titleParts.push(`${roomName} ${roomLocation}`);
      }

      let title = titleParts.join(' | ');
      title = `${title} - ${appointment.reason}`;

      return {
        title: title,
        start: scheduleStartTime ? new Date(scheduleStartTime) : new Date(),
      };
    });
  }
}
