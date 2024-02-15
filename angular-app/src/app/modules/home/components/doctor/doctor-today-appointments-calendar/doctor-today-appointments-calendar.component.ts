import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { differenceInMinutes, startOfDay, startOfHour } from 'date-fns';
import { Appointment } from 'src/app/core/models/appointment.interface';
import { ListResponse } from 'src/app/core/models/response/list-response.interface';
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';

/**
 * Componente que representa la tarjeta de citas del día actual de un médico.
 */
@Component({
  selector: 'app-doctor-today-appointments-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doctor-today-appointments-calendar.component.html',
  styles: [
    `
      .scroll-container {
        height: calc(100vh - 320px);
        overflow-y: auto;
      }
    `,
  ],
  providers: [AppointmentService, DatePipe],
})
export class DoctorTodayAppointmentsCalendarComponent implements AfterViewInit {
  /** Contenedor del calendario. */
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  /** Vista actual del calendario. */
  public view: CalendarView = CalendarView.Day;

  /** Fecha actual de visualización del calendario. */
  public viewDate: Date = new Date();

  /** Eventos del calendario. */
  public events: CalendarEvent[] = [];

  constructor(
    private _cdr: ChangeDetectorRef,
    private _appointmentService: AppointmentService,
    private _datePipe: DatePipe
  ) {}

  ngAfterViewInit() {
    this._scrollToCurrentView();

    this._getEvents(this.viewDate.toISOString().slice(0, 10));
  }

  /**
   * Desplaza el contenedor de desplazamiento para mostrar la vista actual en el calendario.
   * @private
   * @returns {void}
   */
  private _scrollToCurrentView(): void {
    if (CalendarView.Day) {
      // each hour is 60px high, so to get the pixels to scroll it's just the amount of minutes since midnight
      const minutesSinceStartOfDay = differenceInMinutes(
        startOfHour(new Date()),
        startOfDay(new Date())
      );
      // por 3 porque cada hora es 60px (2 segmentos) y en este calendario se muestran 6 segmentos
      this.scrollContainer.nativeElement.scrollTop = minutesSinceStartOfDay * 3;
    }
  }

  /**
   * Obtiene y actualiza los eventos para una fecha específica.
   * @private
   * @param {string} date - Fecha para la que se obtienen los eventos en formato de cadena.
   * @returns {void}
   */
  private _getEvents(date: string): void {
    this._appointmentService
      .getAppointmentsByDoctorAndDay({
        date: date,
        statuses: [
          'scheduled',
          'rescheduled',
          'in_progress',
          'no_show',
          'completed',
        ],
      })
      .subscribe({
        next: (response: ListResponse<Appointment>) => {
          if (Array.isArray(response)) {
            this.events = this._formatData(response);
            this._cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  /**
   * Formatea los datos de citas para su representación en eventos de calendario.
   * @private
   * @param {Appointment[]} appointments - Lista de citas a formatear.
   * @returns {CalendarEvent[]} Lista de eventos de calendario formateados.
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

      if (scheduleStartTime && scheduleEndTime) {
        let startTime =
          this._datePipe.transform(scheduleStartTime, 'HH:mm') || '';
        let endTime = this._datePipe.transform(scheduleEndTime, 'HH:mm') || '';
        titleParts.push(`${startTime} - ${endTime}`);
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
        end: scheduleEndTime ? new Date(scheduleEndTime) : new Date(),
      };
    });
  }
}
