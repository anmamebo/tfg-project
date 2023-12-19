import { Component, EventEmitter, Input, Output } from '@angular/core';

// Servicios
import { PatientService } from 'src/app/core/services/entities/patient.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

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

  constructor(
    private _patientService: PatientService,
    private _notificationService: NotificationService
  ) {}

  /**
   * Elimina un paciente
   * @param id Identificador del paciente
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
   * Activa un paciente
   * @param id Identificador del paciente
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
