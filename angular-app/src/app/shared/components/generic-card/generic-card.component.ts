import { Component, Input } from '@angular/core';

/**
 * Componente genérico para mostrar una tarjeta.
 */
@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
})
export class GenericCardComponent {
  /** Título de la tarjeta. */
  @Input() public title: string = 'Título tarjeta';

  /** Indica si la tarjeta tiene un encabezado. */
  @Input() public hasCardHeader: boolean = true;
}
