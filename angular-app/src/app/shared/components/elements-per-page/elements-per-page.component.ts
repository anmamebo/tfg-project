import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Componente que representa un selector de número de elementos por página.
 */
@Component({
  selector: 'app-elements-per-page',
  templateUrl: './elements-per-page.component.html',
  styleUrls: ['./elements-per-page.component.scss']
})
export class ElementsPerPageComponent {

  /** Número de elementos totales */
  @Input() public totalElements: number = 0;

  /** Número de elementos por página */
  @Input() public elementsPerPage: number = 10;

  /** Evento que se emite cuando se cambia el número de elementos por página */
  @Output() public elementsPerPageChangedEvent: EventEmitter<number> = new EventEmitter<number>();

  /** Opciones de cantidad de elementos por página */
  public quantityOptions: number[] = [5, 10, 20, 50, 100];

  /**
   * Lanza el evento de cambio de número de resultados por página
   */
  onSelectChanged(): void {
    this.elementsPerPageChangedEvent.emit(this.elementsPerPage);
  }
}
