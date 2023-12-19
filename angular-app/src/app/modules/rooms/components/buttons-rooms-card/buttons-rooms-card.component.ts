import { Component, EventEmitter, Input, Output } from '@angular/core';

// Servicios
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
   * Elimina una sala
   * @param id Identificador de la sala
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
   * Activa una sala
   * @param id Identificador de la sala
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
