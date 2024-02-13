import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';

/**
 * Componente base que representa un calendario.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
})
export class BaseCalendarComponent {
  /** Vista actual del calendario. */
  public view: CalendarView = CalendarView.Month;

  /** Enumeración de las vistas de calendario. */
  public CalendarView = CalendarView;

  /** Fecha actual de visualización del calendario. */
  public viewDate: Date = new Date();

  /** Sujeto utilizado para forzar la actualización del calendario. */
  public refresh = new Subject<void>();

  /** Lista de eventos del calendario. */
  public events: CalendarEvent[] = [];

  /** Indica si un día está abierto en la vista mensual del calendario. */
  public activeDayIsOpen: boolean = false;

  /** Día de comienzo de la semana */
  public weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  /** Idioma del calendario */
  public locale: string = 'es';

  constructor(protected _cdr: ChangeDetectorRef) {}

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
