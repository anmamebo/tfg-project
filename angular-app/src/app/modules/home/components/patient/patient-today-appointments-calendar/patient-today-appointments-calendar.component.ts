import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { differenceInMinutes, startOfDay, startOfHour } from 'date-fns';

// Servicios
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';

// Modelos
import { Appointment } from 'src/app/core/models/appointment.interface';

/**
 * Componente que representa la tarjeta de citas del día actual de un paciente.
 */
@Component({
  selector: 'app-patient-today-appointments-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './patient-today-appointments-calendar.component.html',
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
export class PatientTodayAppointmentsCalendarComponent
  implements AfterViewInit
{
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
   * Scroll hacia la hora actual.
   */
  private _scrollToCurrentView() {
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
   * Obtiene los eventos del calendario.
   * @param date - Fecha de los eventos.
   */
  private _getEvents(date: string): void {
    this._appointmentService
      .getAppointmentsByPatientAndDay(date, [
        'scheduled',
        'rescheduled',
        'in_progress',
        'no_show',
        'completed',
      ])
      .subscribe({
        next: (data) => {
          this.events = this._formatData(data);

          this._cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  /**
   * Formatea los datos de las citas para el calendario.
   * @param appointments - Lista de citas.
   * @returns Lista de eventos del calendario.
   */
  private _formatData(appointments: Appointment[]): CalendarEvent[] {
    return appointments.map((appointment: Appointment) => {
      const scheduleStartTime = appointment.schedule?.start_time;
      const scheduleEndTime = appointment.schedule?.end_time;
      const doctorName = appointment.doctor?.user?.name;
      const doctorLastName = appointment.doctor?.user?.last_name;
      const roomName = appointment.room?.name;
      const roomLocation = appointment.room?.location;

      const titleParts: string[] = [];

      if (scheduleStartTime && scheduleEndTime) {
        let startTime =
          this._datePipe.transform(scheduleStartTime, 'HH:mm') || '';
        let endTime = this._datePipe.transform(scheduleEndTime, 'HH:mm') || '';
        titleParts.push(`${startTime} - ${endTime}`);
      }

      if (doctorName && doctorLastName) {
        titleParts.push(`${doctorName} ${doctorLastName}`);
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
}
