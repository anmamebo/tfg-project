import { Component, Input } from '@angular/core';

// Modelos
import { User } from 'src/app/core/models/user.interface';

/**
 * Componente que representa la tarjeta de visualización de la
 * información básica de un administrativo
 */
@Component({
  selector: 'app-view-info-administratives-card',
  templateUrl: './view-info-administratives-card.component.html',
})
export class ViewInfoAdministrativesCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Administrativo que se visualizará */
  @Input() public administrative: User | null = null;

  constructor() {}
}
