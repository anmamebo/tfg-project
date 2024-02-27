import { Component, Input } from '@angular/core';
import { Patient } from '@app/core/models/patient.interface';

/**
 * Componente para la tarjeta de visualización de un paciente
 * en la página de visualización de una cita.
 */
@Component({
  selector: 'app-view-patient-appointments-doctor-card',
  templateUrl: './view-patient-appointments-doctor-card.component.html',
})
export class ViewPatientAppointmentsDoctorCardComponent {
  /** Paciente que se visualizará */
  @Input() public patient: Patient | null = null;
}
