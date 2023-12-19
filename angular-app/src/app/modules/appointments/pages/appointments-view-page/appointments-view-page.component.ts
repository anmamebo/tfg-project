import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbAppointmentsViewData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { AppointmentService } from 'src/app/core/services/entities/appointment.service';

// Modelos
import { Appointment } from 'src/app/core/models/appointment.model';

/**
 * Componente para la página de visualización de una cita
 */
@Component({
  selector: 'app-appointments-view-page',
  templateUrl: './appointments-view-page.component.html',
  providers: [AppointmentService],
})
export class AppointmentsViewPageComponent {
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
   * Actualiza los datos de la cita
   */
  public onRefreshAppointment(): void {
    if (!this.appointment) {
      return;
    }

    this._appointmentService
      .getAppointmentByIdByDoctor(this.appointment.id)
      .subscribe({
        next: (appointment: Appointment) => {
          this.appointment = appointment;
        },
      });
  }
}
