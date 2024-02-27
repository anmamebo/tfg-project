import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ROLES } from '@app/core/constants/roles.constants';
import { PatientService } from '@app/core/services/entities/patient.service';
import { NotificationService } from '@app/core/services/notifications/notification.service';

/**
 * Componente para los botones de la tarjeta de un paciente
 */
@Component({
  selector: 'app-buttons-patients-card',
  templateUrl: './buttons-patients-card.component.html',
  providers: [PatientService, NotificationService],
})
export class ButtonsPatientsCardComponent {
  /** Identificador del paciente */
  @Input() public patientId: string = '';

  /** Indica si el paciente está activo */
  @Input() public isActive: boolean = true;

  /** Evento para refrescar el paciente */
  @Output() public refreshPatient: EventEmitter<void> = new EventEmitter();

  /** Roles que pueden editar */
  public editRoles: string[] = [ROLES.ADMIN, ROLES.DOCTOR];

  /** Roles que pueden eliminar */
  public deleteRoles: string[] = [ROLES.ADMIN];

  /** Roles que pueden activar */
  public activateRoles: string[] = [ROLES.ADMIN];

  constructor(
    private _patientService: PatientService,
    private _notificationService: NotificationService
  ) {}

  /**
   * Elimina un paciente utilizando su ID.
   * Muestra un diálogo de confirmación antes de realizar la eliminación.
   * Emite un evento para actualizar la lista de pacientes después de la eliminación exitosa.
   * @param {string} id - El ID del paciente que se desea eliminar.
   * @returns {void}
   * @public
   */
  public deletePatient(id: string): void {
    this._notificationService.showConfirmDeleteDialog(() => {
      this._patientService.delete(id).subscribe({
        next: () => {
          this.refreshPatient.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido eliminar el paciente.'
          );
        },
      });
    });
  }

  /**
   * Activa un paciente utilizando su ID.
   * Muestra un diálogo de confirmación antes de realizar la activación.
   * Emite un evento para actualizar la lista de pacientes después de la activación exitosa.
   * @param {string} id - El ID del paciente que se desea activar.
   * @returns {void}
   * @public
   */
  public activatePatient(id: string): void {
    this._notificationService.showConfirmReactivateDialog(() => {
      this._patientService.activate(id).subscribe({
        next: () => {
          this.refreshPatient.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido activar el paciente.'
          );
        },
      });
    });
  }
}
