import { Component, Input } from '@angular/core';

// Modelos
import {
  Treatment,
  StatusBadgeClasses,
  STATUS_BADGE_CLASSES,
} from 'src/app/core/models/treatment.interface';

/**
 * Componente que representa un acordeón de tratamientos de una cita.
 */
@Component({
  selector: 'app-accordion-treatments-appointments',
  templateUrl: './accordion-treatments-appointments.component.html',
})
export class AccordionTreatmentsAppointmentsComponent {
  /** Tratamientos. */
  @Input() public treatments: Treatment[] | null = null;

  /** Classes de los badges de estado. */
  public statusBadgeClasses: StatusBadgeClasses = STATUS_BADGE_CLASSES;
}
