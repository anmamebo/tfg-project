import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent } from 'angular-calendar';
import { breadcrumbAppointmentsCalendarPatientData } from 'src/app/core/constants/breadcrumb-data.constants';
import { Appointment } from 'src/app/core/models/appointment.interface';
import { ListResponse } from 'src/app/core/models/response/list-response.interface';
import { CustomDateFormatter } from 'src/app/core/providers/custom-date-formatter.provider';
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { BaseCalendarComponent } from 'src/app/shared/components/base-calendar/base-calendar.component';

/**
 * Componente que representa la página de la agenda de un paciente
 */
@Component({
  selector: 'app-appointments-calendar-patient-page',
  templateUrl: './appointments-calendar-patient-page.component.html',
  styleUrls: ['./appointments-calendar-patient-page.component.scss'],
  providers: [
    AppointmentService,
    DatePipe,
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter },
  ],
})
export class AppointmentsCalendarPatientPageComponent
  extends BaseCalendarComponent
  implements OnInit
{
  /** Título de la página. */
  public pageTitle: string = 'Agenda';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes consultar tu agenda de citas.';

  /** Datos del breadcrumb. */
  public breadcrumbData = breadcrumbAppointmentsCalendarPatientData;

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
   * Obtiene citas del paciente con ciertos estados.
   * @public
   * @returns {void}
   */
  public getAppointments(): void {
    this._appointmentService
      .getAppointmentsByPatient({
        statuses: ['scheduled', 'in_progress', 'completed', 'rescheduled'],
      })
      .subscribe({
        next: (response: ListResponse<Appointment>) => {
          if (Array.isArray(response)) {
            this.events = this._formatData(response);
            this._cdr.detectChanges();
          }
        },
        error: (error: any) => {
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
      const doctorName = appointment.doctor?.user?.name;
      const doctorLastName = appointment.doctor?.user?.last_name;
      const roomName = appointment.room?.name;
      const roomLocation = appointment.room?.location;

      const titleParts: string[] = [];

      if (scheduleStartTime) {
        titleParts.push(
          this._datePipe.transform(scheduleStartTime, 'HH:mm') || ''
        );
      }

      if (doctorName && doctorLastName) {
        titleParts.push(`Dr/a. ${doctorName} ${doctorLastName}`);
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
