import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import { breadcrumbDoctorsScheduleData } from 'src/app/core/constants/breadcrumb-data.constants';
import { Doctor } from 'src/app/core/models/doctor.interface';
import { ListResponse } from 'src/app/core/models/response/list-response.interface';
import { MessageResponse } from 'src/app/core/models/response/message-response.interface';
import { Schedule } from 'src/app/core/models/schedule.interface';
import { CustomDateFormatter } from 'src/app/core/providers/custom-date-formatter.provider';
import { ScheduleService } from 'src/app/core/services/entities/schedule.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { BaseCalendarComponent } from 'src/app/shared/components/base-calendar/base-calendar.component';

/**
 * Componente que representa la página de horarios de médicos
 */
@Component({
  selector: 'app-doctors-schedules-page',
  templateUrl: './doctors-schedules-page.component.html',
  styleUrls: ['./doctors-schedules-page.component.scss'],
  providers: [
    ScheduleService,
    DatePipe,
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter },
  ],
})
export class DoctorsSchedulesPageComponent
  extends BaseCalendarComponent
  implements OnInit
{
  DAY_START_HOUR = 9;
  DAY_END_HOUR = 21;

  /** Título de la página. */
  public pageTitle: string = 'Horarios de médicos';

  /** Descripción de la página. */
  public pageDescription: string =
    'Aquí puedes consultar los horarios de los médicos.';

  /** Datos del breadcrumb. */
  public breadcrumbData = breadcrumbDoctorsScheduleData;

  /** Médico seleccionado. */
  public doctor: Doctor | null = null;

  /** Fecha clicada. */
  public clickedDate: Date | null = null;

  constructor(
    private _scheduleService: ScheduleService,
    private _notificationService: NotificationService,
    private _datePipe: DatePipe,
    private _route: ActivatedRoute,
    public readonly swalTargets: SwalPortalTargets,
    _cdr: ChangeDetectorRef
  ) {
    super(_cdr);
    this.view = CalendarView.Week;
  }

  ngOnInit(): void {
    this.doctor = this._route.snapshot.data['data'];

    this.getEvents();
  }

  /**
   * Obtiene los eventos de la API.
   * @returns {void}
   * @public
   */
  public getEvents(): void {
    if (!this.doctor) return;

    this._scheduleService.getSchedulesForDoctor(this.doctor.id).subscribe({
      next: (response: ListResponse<Schedule>) => {
        if (Array.isArray(response)) {
          const newEvents = this._formatData(response);
          this.events = newEvents;
          this._cdr.detectChanges();
        }
      },
      error: (error) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }

  /**
   * Formatea los datos de los eventos.
   * @param {Schedule[]} schedules - Los horarios.
   * @returns {CalendarEvent[]} Los eventos formateados.
   * @private
   */
  private _formatData(schedules: Schedule[]): CalendarEvent[] {
    return schedules.map((schedule: Schedule) => {
      const start = this._datePipe.transform(
        schedule.start_time,
        'HH:mm'
      ) as string;
      const end = this._datePipe.transform(
        schedule.end_time,
        'HH:mm'
      ) as string;

      return {
        title: `${start} - ${end}`,
        start: new Date(schedule.start_time),
        end: new Date(schedule.end_time),
        color: {
          primary: '#1e90ff',
          secondary: '#D1E8FF',
        },
        meta: schedule,
      };
    });
  }

  /**
   * Ejecuta la lógica al clicar en una fecha.
   * @returns {void}
   * @public
   */
  public createScheduleEvent(): void {
    if (!this.clickedDate || !this.doctor) return;

    const start = new Date(this.clickedDate);
    const end = new Date(start.getTime() + 30 * 60000);

    const formattedStartDate = this._datePipe.transform(
      start,
      'yyyy-MM-ddTHH:mm',
      'es'
    );
    const formattedEndDate = this._datePipe.transform(
      end,
      'yyyy-MM-ddTHH:mm',
      'es'
    );

    const schedule: any = {
      doctor: this.doctor.id,
      start_time: formattedStartDate,
      end_time: formattedEndDate,
    };

    this._scheduleService.createSchedule(schedule).subscribe({
      next: (response: MessageResponse) => {
        this._notificationService.showSuccessToast(response.message);
        this.getEvents();
      },
      error: (error: any) => {
        this._notificationService.showErrorToast(error.message);
      },
    });
  }
}
