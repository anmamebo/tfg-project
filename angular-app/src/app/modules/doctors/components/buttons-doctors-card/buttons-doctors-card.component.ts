import { Component, EventEmitter, Input, Output } from '@angular/core';

// Servicios
import { DoctorService } from 'src/app/core/services/doctor.service';
import { NotificationService } from 'src/app/core/services/notification.service';

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
    private doctorService: DoctorService,
    private notificationService: NotificationService
  ) {}

  /**
   * Elimina un médico
   * @param id Identificador del médico
   */
  public deleteDoctor(id: string): void {
    this.notificationService.showConfirmDeleteDialog(() => {
      this.doctorService.delete(id).subscribe({
        next: () => {
          this.refreshDoctor.emit();
        },
        error: () => {
          this.notificationService.showErrorToast(
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
    this.notificationService.showConfirmReactivateDialog(() => {
      this.doctorService.activate(id).subscribe({
        next: () => {
          this.refreshDoctor.emit();
        },
        error: () => {
          this.notificationService.showErrorToast(
            'No se ha podido activar el médico.'
          );
        },
      });
    });
  }
}
