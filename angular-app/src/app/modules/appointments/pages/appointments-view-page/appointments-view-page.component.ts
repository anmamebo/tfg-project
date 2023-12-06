import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbAppointmentsViewData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { AppointmentService } from 'src/app/core/services/appointment.service';

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
    private route: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {
    this.appointment = this.route.snapshot.data['data']; // Obtiene los datos de la cita desde el resolver
    const formattedDate = this.appointment?.schedule?.start_time
      ? new Date(this.appointment.schedule.start_time).toLocaleString()
      : '';
    this.pageTitle = `${this.appointment?.patient?.user?.name} ${this.appointment?.patient?.user?.last_name} - (${formattedDate})`;
  }

  /**
   * Actualiza los datos de la cita
   */
  public onRefreshAppointment(): void {
    this.appointmentService
      .getAppointmentByIdByDoctor(this.appointment!.id)
      .subscribe({
        next: (appointment: Appointment) => {
          this.appointment = appointment;
        },
      });
  }
}
