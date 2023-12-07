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

import { breadcrumbAppointmentsCalendarPatientData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { NotificationService } from 'src/app/core/services/notification.service';

// Modelos
import { Appointment } from 'src/app/core/models/appointment.model';

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
    private appointmentService: AppointmentService,
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  /**
   * Obtiene las citas del paciente.
   */
  public getAppointments() {
    this.appointmentService
      .getAppointmentsByPatient(
        ['scheduled', 'in_progress', 'completed', 'rescheduled'],
        0,
        0,
        '',
        false
      )
      .subscribe({
        next: (data: any) => {
          this.events = this.formatData(data);
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          this.notificationService.showErrorToast(error.message);
        },
      });
  }

  /**
   * Formatea los datos de las citas para el calendario.
   * @param appointments - Lista de citas.
   * @returns Lista de eventos del calendario.
   */
  private formatData(appointments: Appointment[]): CalendarEvent[] {
    return appointments.map((appointment: Appointment) => {
      const scheduleStartTime = appointment.schedule?.start_time;
      const doctorName = appointment.doctor?.user?.name;
      const doctorLastName = appointment.doctor?.user?.last_name;
      const roomName = appointment.room?.name;
      const roomLocation = appointment.room?.location;

      const titleParts: string[] = [];

      if (scheduleStartTime) {
        titleParts.push(
          this.datePipe.transform(scheduleStartTime, 'HH:mm') || ''
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
   * Maneja el clic en un día del calendario.
   * @param param - Objeto con la fecha y eventos asociados al día clicado.
   * @param param.date - Fecha clicada.
   * @param param.events - Eventos asociados a la fecha clicada.
   */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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
   * @param param - Objeto con el evento y las nuevas fechas.
   * @param param.event - Evento del calendario.
   * @param param.newStart - Nueva fecha de inicio.
   * @param param.newEnd - Nueva fecha de fin.
   */
  eventTimesChanged({
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
   * @param view Vista del calendario.
   */
  setView(view: CalendarView) {
    this.view = view;
  }

  /**
   * Cierra el día abierto en la vista mensual del calendario.
   */
  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
}
