import { Component, EventEmitter, Input, Output } from '@angular/core';

// Servicios
import { MedicalspecialtyService } from 'src/app/core/services/entities/medicalspecialty.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente para los botones de la tarjeta de una especialidad médica
 */
@Component({
  selector: 'app-buttons-medical-specialties-card',
  templateUrl: './buttons-medical-specialties-card.component.html',
  providers: [MedicalspecialtyService],
})
export class ButtonsMedicalSpecialtiesCardComponent {
  /** Identificador de la especialidad médica */
  @Input() public medicalSpecialtyId: string = '';

  /** Indica si la especialidad médica está activa */
  @Input() public isActive: boolean = true;

  /** Evento para refrescar la especialidad médica */
  @Output() public refreshMedicalSpecialty: EventEmitter<void> =
    new EventEmitter();

  constructor(
    private _medicalSpecialtyService: MedicalspecialtyService,
    private _notificationService: NotificationService
  ) {}

  /**
   * Elimina una especialidad médica según su ID.
   * Muestra un diálogo de confirmación antes de realizar la eliminación.
   * Emite un evento para actualizar la lista de especialidades médicas después de la eliminación exitosa.
   * @param {string} id - El ID de la especialidad médica que se desea eliminar.
   * @returns {void}
   * @public
   */
  public deleteMedicalSpecialty(id: string): void {
    this._notificationService.showConfirmDeleteDialog(() => {
      this._medicalSpecialtyService.delete(id).subscribe({
        next: () => {
          this.refreshMedicalSpecialty.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido eliminar la especialidad médica.'
          );
        },
      });
    });
  }

  /**
   * Activa una especialidad médica utilizando su ID.
   * Muestra un diálogo de confirmación antes de realizar la activación.
   * Emite un evento para actualizar la lista de especialidades médicas después de la activación exitosa.
   * @param {string} id - El ID de la especialidad médica que se desea activar.
   * @returns {void}
   * @public
   */
  public activateMedicalSpecialty(id: string): void {
    this._notificationService.showConfirmReactivateDialog(() => {
      this._medicalSpecialtyService.activate(id).subscribe({
        next: () => {
          this.refreshMedicalSpecialty.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido activar la especialidad médica.'
          );
        },
      });
    });
  }
}
