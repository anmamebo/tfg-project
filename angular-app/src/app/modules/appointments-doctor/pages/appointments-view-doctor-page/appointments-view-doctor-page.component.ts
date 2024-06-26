import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { breadcrumbAppointmentsViewData } from '@app/core/constants/breadcrumb-data.constants';
import { Appointment } from '@app/core/models/appointment.interface';
import { AppointmentService } from '@app/core/services/entities/appointment.service';

/**
 * Componente para la página de visualización de una cita
 */
@Component({
  selector: 'app-appointments-view-doctor-page',
  templateUrl: './appointments-view-doctor-page.component.html',
  providers: [AppointmentService],
})
export class AppointmentsViewDoctorPageComponent {
  /** Título de la página */
  public pageTitle: string = 'Visualizar';

  /** Descripción de la página */
  public pageDescription: string = 'Aquí puedes visualizar una cita.';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbAppointmentsViewData;

  /** Cita que se visualizará */
  public appointment: Appointment | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _appointmentService: AppointmentService
  ) {
    this.appointment = this._route.snapshot.data['data']; // Obtiene los datos de la cita desde el resolver

    if (this.appointment) {
      const formattedDate = this.appointment?.schedule?.start_time
        ? new Date(this.appointment.schedule.start_time).toLocaleString()
        : '';

      const patientName = this.appointment?.patient?.user?.name ?? '';
      const patientLastName = this.appointment?.patient?.user?.last_name ?? '';

      this.pageTitle = `${patientName} ${patientLastName} - (${formattedDate})`;
    } else {
      this.pageTitle = 'Detalle de Cita';
    }
  }

  /**
   * Actualiza la información de la cita actual, refrescando los datos desde el servicio.
   * @public
   * @returns {void}
   */
  public onRefreshAppointment(): void {
    if (!this.appointment) {
      return;
    }

    this._appointmentService
      .getAppointmentByIdForDoctor(this.appointment.id)
      .subscribe({
        next: (appointment: Appointment) => {
          this.appointment = appointment;
        },
      });
  }
}
