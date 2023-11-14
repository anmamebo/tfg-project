import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";

// Calendario
import { isSameDay, isSameMonth } from "date-fns";
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from "angular-calendar";
import { EventColor } from "calendar-utils";

import { breadcrumbScheduleData } from "src/app/core/constants/breadcrumb-data";

// Servicios
import { ScheduleService } from "src/app/core/services/schedule.service";


const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  providers: [ScheduleService, DatePipe]
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
  events: CalendarEvent[] = []

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: { ...colors['red'] },
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: { ...colors['yellow'] },
  //     actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: { ...colors['blue'] },
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: { ...colors['yellow'] },
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

  /** Variable que indica si un día está abierto en la vista mensual del calendario. */
  activeDayIsOpen: boolean = false;

  constructor(
    private scheduleService: ScheduleService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getScheduleByDoctor();
  }

  /**
   * Obtiene los horarios del doctor y actualiza la lista de eventos del calendario.
   */
  public getScheduleByDoctor(): void {
    this.scheduleService.getScheduleByDoctor().subscribe({
      next: (data) => {
        this.events = data.map(schedule => ({
          start: new Date(schedule.start_time),
          end: new Date(schedule.end_time),
          title: this.datePipe.transform(schedule.start_time, 'h:mm a') + ' - ' + this.datePipe.transform(schedule.end_time, 'h:mm a'),
          color: { ...colors['blue'] },
        }));
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    })
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
  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
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
