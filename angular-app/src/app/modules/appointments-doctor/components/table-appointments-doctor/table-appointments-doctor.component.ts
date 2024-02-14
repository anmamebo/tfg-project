import { Component } from '@angular/core';
import {
  STATUS_BADGE_CLASSES,
  StatusBadgeClasses,
} from 'src/app/core/models/appointment.interface';
import { GenericTableComponent } from 'src/app/shared/components/generic-table/generic-table.component';

/**
 * Componente que representa una tabla de citas.
 */
@Component({
  selector: 'app-table-appointments-doctor',
  templateUrl: './table-appointments-doctor.component.html',
})
export class TableAppointmentsDoctorComponent extends GenericTableComponent {
  /** Classes de los badges de estado. */
  public statusBadgeClasses: StatusBadgeClasses = STATUS_BADGE_CLASSES;

  constructor() {
    super();
    this.sortedColumn = 'schedule.start_time';
    this.reverseSort = false;
  }
}
