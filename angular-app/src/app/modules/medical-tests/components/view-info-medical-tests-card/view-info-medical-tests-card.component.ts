import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

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

  /** Evento para indicar que se ha actualizado la prueba */
  @Output() public updatedMedicalTest: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(public readonly swalTargets: SwalPortalTargets) {}
}
