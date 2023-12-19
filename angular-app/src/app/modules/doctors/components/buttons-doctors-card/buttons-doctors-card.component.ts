import { Component, EventEmitter, Input, Output } from '@angular/core';

// Servicios
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
   * Elimina un médico
   * @param id Identificador del médico
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
   * Activa un médico
   * @param id Identificador del médico
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
