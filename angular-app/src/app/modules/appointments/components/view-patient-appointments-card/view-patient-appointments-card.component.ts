import { Component, Input } from '@angular/core';

// Modelos
import { Patient } from 'src/app/core/models/patient.interface';

/**
 * Componente para la tarjeta de visualización de un paciente
 * en la página de visualización de una cita.
 */
@Component({
  selector: 'app-view-patient-appointments-card',
  templateUrl: './view-patient-appointments-card.component.html',
})
export class ViewPatientAppointmentsCardComponent {
  /** Paciente que se visualizará */
  @Input() public patient: Patient | null = null;
}
