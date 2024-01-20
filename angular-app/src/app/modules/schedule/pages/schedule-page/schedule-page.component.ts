import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';

// Calendario
import { isSameDay, isSameMonth } from 'date-fns';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

import { breadcrumbScheduleData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { Appointment } from 'src/app/core/models/appointment.interface';

/**
 * Componente que representa la página de mi horario
 */
@Component({
  selector: 'app-schedule-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  providers: [AppointmentService, DatePipe],
})
export class SchedulePageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Mi horario';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes consultar tu horario.';

  /** Datos del breadcrumb. */
  public breadcrumbData = breadcrumbScheduleData;

  /** Vista actual del calendario. */
  public view: CalendarView = CalendarView.Month;

  /** Enumeración de las vistas de calendario. */
  CalendarView = CalendarView;

  /** Fecha actual de visualización del calendario. */
  viewDate: Date = new Date();

  /** Sujeto utilizado para forzar la actualización del calendario. */
  refresh = new Subject<void>();

  /** Lista de eventos del calendario. */
  events: CalendarEvent[] = [];

  /** Indica si un día está abierto en la vista mensual del calendario. */
  activeDayIsOpen: boolean = false;

  constructor(
    private _appointmentService: AppointmentService,
    private _notificationService: NotificationService,
    private _cdr: ChangeDetectorRef,
    private _datePipe: DatePipe
  ) {}

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
        next: (data: any) => {
          this.events = this._formatData(data);
          this._cdr.detectChanges();
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

      return {
        title: titleParts.join(' | '),
        start: scheduleStartTime ? new Date(scheduleStartTime) : new Date(),
      };
    });
  }

  /**
   * Maneja el evento de clic en un día del calendario.
   * @public
   * @param {object} params - Objeto que contiene la fecha y eventos del día clicado.
   * @param {Date} params.date - Fecha del día clicado.
   * @param {CalendarEvent[]} params.events - Lista de eventos asociados al día clicado.
   * @returns {void}
   */
  public dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  /**
   * Maneja el evento de cambio de tiempo de un evento en el calendario.
   * Actualiza las fechas de inicio y fin del evento modificado en la lista de eventos.
   * @public
   * @param {object} params - Objeto que contiene el evento y las nuevas fechas de inicio y fin.
   * @param {CalendarEvent} params.event - Evento que experimenta el cambio de tiempo.
   * @param {Date} params.newStart - Nueva fecha de inicio del evento.
   * @param {Date} params.newEnd - Nueva fecha de fin del evento.
   * @returns {void}
   */
  public eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  /**
   * Establece la vista del calendario a la vista proporcionada.
   * @public
   * @param {CalendarView} view - La vista del calendario que se establecerá.
   * @returns {void}
   */
  public setView(view: CalendarView): void {
    this.view = view;
  }

  /**
   * Cierra la vista expandida de un día en el modo de vista mensual del calendario.
   * @public
   * @returns {void}
   */
  public closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
}
