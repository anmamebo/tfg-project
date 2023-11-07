import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


/**
 * Componente que representa la paginación
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  /**
   * Página actual
   */
  @Input() public page: number = 1;
  
  /**
   * Número de páginas totales
   */
  @Input() public totalPages: number = 1;
  
  /**
   * Número de elementos totales
   */
  @Input() public numItems: number = 0;
  
  /**
   * Evento que se emite cuando se cambia de página
   */
  @Output() pageEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Va a la página siguiente
   */
  next() {
    this.page++;
    this.turnPage();
  }

  /**
   * Va a la página anterior
   */
  prev() {
    this.page--;
    this.turnPage();
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.turnPage();
    }
  }

  /**
   * Emite al padre la página a la que se quiere ir
   */
  turnPage() {
    this.pageEmitter.emit(this.page);
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
