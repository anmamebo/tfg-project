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

import { breadcrumbAppointmentsCalendarPatientData } from 'src/app/core/constants/breadcrumb-data.constants';

// Servicios
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

// Modelos
import { Appointment } from 'src/app/core/models/appointment.interface';

/**
 * Componente que representa la página de la agenda de un paciente
 */
@Component({
  selector: 'app-appointments-calendar-patient-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appointments-calendar-patient-page.component.html',
  styleUrls: ['./appointments-calendar-patient-page.component.scss'],
  providers: [AppointmentService, DatePipe],
})
export class AppointmentsCalendarPatientPageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Agenda';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes consultar tu agenda de citas.';

  /** Datos del breadcrumb. */
  public breadcrumbData = breadcrumbAppointmentsCalendarPatientData;

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
    private _datePipe: DatePipe,
    private _cdr: ChangeDetectorRef
  ) {}

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
        next: (data: any) => {
          this.events = this._formatData(data);
          this._cdr.detectChanges();
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

      return {
        title: titleParts.join(' | '),
        start: scheduleStartTime ? new Date(scheduleStartTime) : new Date(),
      };
    });
  }

  /**
   * Maneja el evento de clic en un día en el calendario.
   * @public
   * @param {Date} date - Fecha seleccionada.
   * @param {CalendarEvent[]} events - Eventos del día seleccionado.
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
   * Maneja el cambio en la hora de un evento del calendario.
   * @public
   * @param {CalendarEventTimesChangedEvent} event - Evento del calendario.
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
   * Settea la vista del calendario.
   * @public
   * @param {CalendarView} view - Vista del calendario.
   * @returns {void}
   */
  public setView(view: CalendarView): void {
    this.view = view;
  }

  /**
   * Cierra el día abierto en la vista mensual del calendario.
   * @public
   * @returns {void}
   */
  public closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
}
