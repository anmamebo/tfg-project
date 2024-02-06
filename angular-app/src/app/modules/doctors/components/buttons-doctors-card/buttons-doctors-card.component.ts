import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DoctorService } from 'src/app/core/services/entities/doctor.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente para los botones de la tarjeta de un médico
 */
@Component({
  selector: 'app-buttons-doctors-card',
  templateUrl: './buttons-doctors-card.component.html',
  providers: [DoctorService],
})
export class ButtonsDoctorsCardComponent {
  /** Identificador del médico */
  @Input() public doctorId: string = '';

  /** Indica si el médico está activo */
  @Input() public isActive: boolean = true;

  /** Evento para refrescar el médico */
  @Output() public refreshDoctor: EventEmitter<void> = new EventEmitter();

  constructor(
    private _doctorService: DoctorService,
    private _notificationService: NotificationService
  ) {}

  /**
   * Elimina un doctor según su ID.
   * Muestra un diálogo de confirmación antes de realizar la eliminación.
   * Emite un evento para actualizar la lista de doctores después de la eliminación exitosa.
   * @param {string} id - El ID del doctor que se desea eliminar.
   * @returns {void}
   * @public
   */
  public deleteDoctor(id: string): void {
    this._notificationService.showConfirmDeleteDialog(() => {
      this._doctorService.delete(id).subscribe({
        next: () => {
          this.refreshDoctor.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido eliminar el doctor.'
          );
        },
      });
    });
  }

  /**
   * Activa un médico utilizando su ID.
   * Muestra un diálogo de confirmación antes de realizar la activación.
   * Emite un evento para actualizar la lista de médicos después de la activación exitosa.
   * @param {string} id - El ID del médico que se desea activar.
   * @returns {void}
   * @public
   */
  public activateDoctor(id: string): void {
    this._notificationService.showConfirmReactivateDialog(() => {
      this._doctorService.activate(id).subscribe({
        next: () => {
          this.refreshDoctor.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido activar el médico.'
          );
        },
      });
    });
  }
}
