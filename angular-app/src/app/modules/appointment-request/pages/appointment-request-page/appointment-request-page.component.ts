import { Component } from '@angular/core';
import { breadcrumbAppointmentsRequestPatientData } from '@app/core/constants/breadcrumb-data.constants';

/**
 * Componente para la página de solicitud de cita de un paciente.
 */
@Component({
  selector: 'app-appointment-request-page',
  templateUrl: './appointment-request-page.component.html',
})
export class AppointmentRequestPageComponent {
  /** Título de la página. */
  public pageTitle: string = 'Solicitud de cita';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes solicitar una cita.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbAppointmentsRequestPatientData;
}
