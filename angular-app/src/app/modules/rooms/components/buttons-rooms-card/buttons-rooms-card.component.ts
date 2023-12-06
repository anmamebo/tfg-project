import { Component, EventEmitter, Input, Output } from '@angular/core';

// Servicios
import { RoomService } from 'src/app/core/services/room.service';
import { NotificationService } from 'src/app/core/services/notification.service';

/**
 * Componente para los botones de la tarjeta de una sala
 */
@Component({
  selector: 'app-buttons-rooms-card',
  templateUrl: './buttons-rooms-card.component.html',
  styleUrls: ['./buttons-rooms-card.component.scss'],
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
    private roomService: RoomService,
    private notificationService: NotificationService
  ) {}

  /**
   * Elimina una sala
   * @param id Identificador de la sala
   */
  public deleteRoom(id: string): void {
    this.notificationService.showConfirmDeleteDialog(() => {
      this.roomService.delete(id).subscribe({
        next: () => {
          this.refreshRoom.emit();
        },
        error: () => {
          this.notificationService.showErrorToast(
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
    this.notificationService.showConfirmReactivateDialog(() => {
      this.roomService.activate(id).subscribe({
        next: () => {
          this.refreshRoom.emit();
        },
        error: () => {
          this.notificationService.showErrorToast(
            'No se ha podido activar la sala.'
          );
        },
      });
    });
  }
}
