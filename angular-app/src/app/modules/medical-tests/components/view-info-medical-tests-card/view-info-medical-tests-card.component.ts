import { Component, Input } from '@angular/core';

// Modelos
import { MedicalTest } from 'src/app/core/models/medical-test.interface';

/**
 * Componente para mostrar la información de un examen médico
 */
@Component({
  selector: 'app-view-info-medical-tests-card',
  templateUrl: './view-info-medical-tests-card.component.html',
})
export class ViewInfoMedicalTestsCardComponent {
  /** Examen médico a mostrar */
  @Input() public medicalTest: MedicalTest | null = null;
}
