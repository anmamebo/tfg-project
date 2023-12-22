import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Componente que representa la paginación
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  /** Página actual */
  @Input() public page: number = 1;

  /** Número de páginas totales */
  @Input() public totalPages: number = 1;

  /** Número de elementos totales */
  @Input() public numItems: number = 0;

  /** Evento que se emite cuando se cambia de página */
  @Output() pageEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  /**
   * Avanza a la siguiente página y ejecuta la función para cambiar de página.
   * @public
   * @returns {void}
   */
  public next(): void {
    this.page++;
    this.turnPage();
  }

  /**
   * Retrocede a la página anterior y ejecuta la función para cambiar de página.
   * @public
   * @returns {void}
   */
  public prev(): void {
    this.page--;
    this.turnPage();
  }

  /**
   * Navega a una página específica dentro del rango de páginas disponibles.
   * @public
   * @param {number} pageNumber - El número de la página a la que se quiere ir.
   * @returns {void}
   */
  public goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.turnPage();
    }
  }

  /**
   * Emite un evento indicando el cambio de página.
   * @public
   * @returns {void}
   */
  public turnPage(): void {
    this.pageEmitter.emit(this.page);
  }

  /**
   * Retorna un array con el número total de páginas.
   * @public
   * @returns {number[]} - Array con números representando las páginas.
   */
  public getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
