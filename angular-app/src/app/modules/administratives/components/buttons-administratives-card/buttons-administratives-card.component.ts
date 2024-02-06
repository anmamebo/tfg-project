import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdministrativeService } from 'src/app/core/services/entities/administrative.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente para los botones de la tarjeta de un administrativo
 */
@Component({
  selector: 'app-buttons-administratives-card',
  templateUrl: './buttons-administratives-card.component.html',
  providers: [AdministrativeService],
})
export class ButtonsAdministrativesCardComponent {
  /** Identificador del administrativo */
  @Input() public administrativeId: string = '';

  /** Indica si el administrativo está activo */
  @Input() public isActive: boolean = true;

  /** Evento para refrescar el administrativo */
  @Output() public refreshAdministrative: EventEmitter<void> =
    new EventEmitter();

  constructor(
    private _administrativeService: AdministrativeService,
    private _notificationService: NotificationService
  ) {}

  /**
   * Elimina un administrativo según su ID.
   * Muestra un diálogo de confirmación antes de realizar la eliminación.
   * Emite un evento para actualizar la lista de administrativos después de la eliminación exitosa.
   * @param {string} id - El ID del administrativo que se desea eliminar.
   * @returns {void}
   * @public
   */
  public deleteAdministrative(id: string): void {
    this._notificationService.showConfirmDeleteDialog(() => {
      this._administrativeService.delete(id).subscribe({
        next: () => {
          this.refreshAdministrative.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido eliminar el administrativo.'
          );
        },
      });
    });
  }

  /**
   * Activa un administrativo utilizando su ID.
   * Muestra un diálogo de confirmación antes de realizar la activación.
   * Emite un evento para actualizar la lista de administrativos después de la activación exitosa.
   * @param {string} id - El ID del administrativo que se desea activar.
   * @returns {void}
   * @public
   */
  public activateAdministrative(id: string): void {
    this._notificationService.showConfirmReactivateDialog(() => {
      this._administrativeService.activate(id).subscribe({
        next: () => {
          this.refreshAdministrative.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido activar el administrativo.'
          );
        },
      });
    });
  }
}
