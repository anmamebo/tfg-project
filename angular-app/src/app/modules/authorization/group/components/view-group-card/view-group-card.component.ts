import { Component, Input } from '@angular/core';

// Modelos
import { Group } from 'src/app/core/models/group.interface';

/**
 * Componente que representa la tarjeta de visualización de un grupo
 */
@Component({
  selector: 'app-view-group-card',
  templateUrl: './view-group-card.component.html',
})
export class ViewGroupCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Ver Grupo';

  /** Grupo que se visualizará */
  @Input() public group: Group | null = null;

  constructor() {}
}
