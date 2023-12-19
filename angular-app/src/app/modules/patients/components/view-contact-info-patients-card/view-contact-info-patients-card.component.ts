import { Component, Input } from '@angular/core';

// Modelos
import { Patient } from 'src/app/core/models/patient.interface';

/**
 * Componente que representa la tarjeta de visualización de la
 * información de contacto de un paciente
 */
@Component({
  selector: 'app-view-contact-info-patients-card',
  templateUrl: './view-contact-info-patients-card.component.html',
})
export class ViewContactInfoPatientsCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Información de Contacto';

  /** Paciente que se visualizará */
  @Input() public patient: Patient | null = null;

  constructor() {}
}
