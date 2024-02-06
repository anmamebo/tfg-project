import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomService } from 'src/app/core/services/entities/room.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

/**
 * Componente para los botones de la tarjeta de una sala
 */
@Component({
  selector: 'app-buttons-rooms-card',
  templateUrl: './buttons-rooms-card.component.html',
  providers: [RoomService],
})
export class ButtonsRoomsCardComponent {
  /** Identificador de la sala */
  @Input() public roomId: string = '';

  /** Indica si la sala está activa */
  @Input() public isActive: boolean = true;

  /** Evento para refrescar la sala */
  @Output() public refreshRoom: EventEmitter<void> = new EventEmitter();

  constructor(
    private _roomService: RoomService,
    private _notificationService: NotificationService
  ) {}

  /**
   * Elimina una sala específica.
   * Muestra un diálogo de confirmación antes de la eliminación.
   * Emite un evento de actualización ('refreshRoom') después de eliminar la sala.
   * @public
   * @param {string} id - El ID de la sala que se eliminará.
   * @returns {void}
   */
  public deleteRoom(id: string): void {
    this._notificationService.showConfirmDeleteDialog(() => {
      this._roomService.delete(id).subscribe({
        next: () => {
          this.refreshRoom.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido eliminar la sala.'
          );
        },
      });
    });
  }

  /**
   * Activa una sala específica.
   * Muestra un diálogo de confirmación antes de la activación.
   * Emite un evento de actualización ('refreshRoom') después de activar la sala.
   * @public
   * @param {string} id - El ID de la sala que se activará.
   * @returns {void}
   */
  public activateRoom(id: string): void {
    this._notificationService.showConfirmReactivateDialog(() => {
      this._roomService.activate(id).subscribe({
        next: () => {
          this.refreshRoom.emit();
        },
        error: () => {
          this._notificationService.showErrorToast(
            'No se ha podido activar la sala.'
          );
        },
      });
    });
  }
}
