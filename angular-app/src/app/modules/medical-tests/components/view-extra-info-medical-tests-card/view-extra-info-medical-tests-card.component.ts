import { Component, Input } from '@angular/core';
import { MedicalTest } from 'src/app/core/models/medical-test.interface';

/**
 * Componente para mostrar la información de un examen médico
 */
@Component({
  selector: 'app-view-extra-info-medical-tests-card',
  templateUrl: './view-extra-info-medical-tests-card.component.html',
})
export class ViewExtraInfoMedicalTestsCardComponent {
  /** Examen médico a mostrar */
  @Input() public medicalTest: MedicalTest | null = null;
}
