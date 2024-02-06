import { Component, Input } from '@angular/core';
import { Room } from 'src/app/core/models/room.interface';

/**
 * Componente que representa la tarjeta de visualización de la
 * información básica de una sala
 */
@Component({
  selector: 'app-view-info-rooms-card',
  templateUrl: './view-info-rooms-card.component.html',
})
export class ViewInfoRoomsCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Sala que se visualizará */
  @Input() public room: Room | null = null;

  constructor() {}
}
