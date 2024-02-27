import { Component, Input } from '@angular/core';
import { Patient } from '@app/core/models/patient.interface';

/**
 * Componente que representa la tarjeta de visualización de la
 * información básica de un paciente
 */
@Component({
  selector: 'app-view-basic-info-patients-card',
  templateUrl: './view-basic-info-patients-card.component.html',
})
export class ViewBasicInfoPatientsCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Paciente que se visualizará */
  @Input() public patient: Patient | null = null;

  constructor() {}
}
