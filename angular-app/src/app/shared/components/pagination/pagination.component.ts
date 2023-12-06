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
   * Va a la página siguiente
   */
  public next(): void {
    this.page++;
    this.turnPage();
  }

  /**
   * Va a la página anterior
   */
  public prev(): void {
    this.page--;
    this.turnPage();
  }

  /**
   * Va a la página indicada
   */
  public goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.turnPage();
    }
  }

  /**
   * Emite al padre la página a la que se quiere ir
   */
  public turnPage(): void {
    this.pageEmitter.emit(this.page);
  }

  /**
   * Devuelve un array con las páginas que se van a mostrar en la paginación
   * @returns Array con las páginas que se van a mostrar en la paginación
   */
  public getPages(): number[] {
    // const maxDisplayedPages = 8;
    // const pagesBeforeCurrent = Math.floor(maxDisplayedPages / 2);
    // const pagesAfterCurrent = maxDisplayedPages - pagesBeforeCurrent;

    // let startPage = Math.max(1, this.page - pagesBeforeCurrent);
    // let endPage = Math.min(this.totalPages, this.page + pagesAfterCurrent);

    // if (endPage - startPage < maxDisplayedPages) {
    //   startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    // }

    // return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
