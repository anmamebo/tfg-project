import { Component } from '@angular/core';
import { GenericTableComponent } from 'src/app/shared/components/generic-table/generic-table.component';

// Modelos
import {
  StatusBadgeClasses,
  STATUS_BADGE_CLASSES,
} from 'src/app/core/models/appointment.interface';

/**
 * Componente que representa una tabla de citas.
 */
@Component({
  selector: 'app-table-appointments',
  templateUrl: './table-appointments.component.html',
})
export class TableAppointmentsComponent extends GenericTableComponent {
  /** Classes de los badges de estado. */
  public statusBadgeClasses: StatusBadgeClasses = STATUS_BADGE_CLASSES;

  constructor() {
    super();
    this.sortedColumn = 'schedule.start_time';
    this.reverseSort = false;
  }
}
