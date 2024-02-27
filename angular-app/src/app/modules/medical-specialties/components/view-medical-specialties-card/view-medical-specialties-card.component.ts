import { Component, Input } from '@angular/core';
import { MedicalSpecialty } from '@app/core/models/medical-specialty.interface';

/**
 * Componente que representa la tarjeta de visualización de la
 * información básica de una especialidad médica
 */
@Component({
  selector: 'app-view-medical-specialties-card',
  templateUrl: './view-medical-specialties-card.component.html',
})
export class ViewMedicalSpecialtiesCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Especialidad médica que se visualizará */
  @Input() public medicalSpecialty: MedicalSpecialty | null = null;

  constructor() {}
}
