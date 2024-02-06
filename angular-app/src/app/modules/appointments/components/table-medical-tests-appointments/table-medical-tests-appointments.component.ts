import { Component, Input } from '@angular/core';
import { MedicalTest } from 'src/app/core/models/medical-test.interface';

/**
 * Componente que representa una tabla de pruebas médicas de una cita.
 */
@Component({
  selector: 'app-table-medical-tests-appointments',
  templateUrl: './table-medical-tests-appointments.component.html',
})
export class TableMedicalTestsAppointmentsComponent {
  /** Pruebas médicas. */
  @Input() public medicalTests: MedicalTest[] | null = null;
}
