import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { breadcrumbScheduleData } from '@app/core/constants/breadcrumb-data.constants';
import { Appointment } from '@app/core/models/appointment.interface';
import { ListResponse } from '@app/core/models/response/list-response.interface';
import { Schedule } from '@app/core/models/schedule.interface';
import { CustomDateFormatter } from '@app/core/providers/custom-date-formatter.provider';
import { AppointmentService } from '@app/core/services/entities/appointment.service';
import { ScheduleService } from '@app/core/services/entities/schedule.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { BaseCalendarComponent } from '@app/shared/components/base-calendar/base-calendar.component';
import { CalendarDateFormatter, CalendarEvent } from 'angular-calendar';
import { EventColor } from 'calendar-utils';

const colors: Record<string, EventColor> = {
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

/**
 * Componente que representa la página de mi horario
 */
@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  providers: [
    AppointmentService,
    ScheduleService,
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
    private _scheduleService: ScheduleService,
    private _notificationService: NotificationService,
    private _datePipe: DatePipe,
    _cdr: ChangeDetectorRef
  ) {
    super(_cdr);
  }

  ngOnInit(): void {
    this.getAppointments();
    this.getNotAssignedSchedules();
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
            const newEvents = this._formatData(response);
            this.events = [...this.events, ...newEvents];
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
      const scheduleEndTime = appointment.schedule?.end_time;
      const patientName = appointment.patient?.user?.name;
      const patientLastName = appointment.patient?.user?.last_name;
      const roomName = appointment.room?.name;
      const roomLocation = appointment.room?.location;

      const titleParts: string[] = [];

      if (scheduleStartTime) {
        let date = `${
          this._datePipe.transform(scheduleStartTime, 'HH:mm') || ''
        }`;

        if (scheduleEndTime) {
          date = `${date} - ${
            this._datePipe.transform(scheduleEndTime, 'HH:mm') || ''
          }`;
        }

        titleParts.push(date);
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
        color: { ...colors['blue'] },
      };
    });
  }

  /**
   * Obtiene los horarios que no han sido asignados a citas y actualiza los eventos en la interfaz.
   * @public
   * @returns {void}
   */
  public getNotAssignedSchedules(): void {
    this._scheduleService.getNotAssignedSchedulesForDoctor().subscribe({
      next: (response: ListResponse<Schedule>) => {
        if (Array.isArray(response)) {
          const newEvents = this._formatNotAssignedSchedules(response);
          this.events = [...this.events, ...newEvents];
          this._cdr.detectChanges();
        }
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Formatea los datos de los horarios que no han sido asignados a citas para su visualización en el calendario.
   * @private
   * @param {Schedule[]} schedules - Lista de horarios a formatear.
   * @returns {CalendarEvent[]} - Lista de eventos formateados para el calendario.
   */
  private _formatNotAssignedSchedules(schedules: Schedule[]): CalendarEvent[] {
    return schedules.map((schedule: Schedule) => {
      const startTime = schedule.start_time;
      const endTime = schedule.end_time;

      const title = `${this._datePipe.transform(
        startTime,
        'HH:mm'
      )} - ${this._datePipe.transform(
        endTime,
        'HH:mm'
      )} | Horario sin cita asignada`;

      return {
        title: title,
        start: startTime ? new Date(startTime) : new Date(),
        color: { ...colors['yellow'] },
      };
    });
  }
}
