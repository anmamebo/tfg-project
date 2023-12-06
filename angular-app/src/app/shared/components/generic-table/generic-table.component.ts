import { Component, EventEmitter, Input, Output } from '@angular/core';

// Modelos
import { SortEvent } from 'src/app/core/models/sortEvent.model';

/**
 * Componente que representa una tabla genérica.
 */
@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent {
  /** Array de columnas con formato { header: string, field: string } */
  @Input() public columns: any[] | null = null;

  /** Array de datos a mostrar en la tabla. */
  @Input() public data: any[] | null = null;

  /** Booleano que indica si se muestran las acciones en la tabla. */
  @Input() public actions: boolean = false;

  /** Objeto con las urls de las acciones. */
  @Input() public actionsUrls: any = {};

  /** Evento que se lanza al pulsar el botón de eliminar. */
  @Output() public onDeleteEvent: EventEmitter<any> = new EventEmitter<any>();

  /** Booleano que indica si se muestran las filas de forma alterna. */
  @Input() public striped: boolean = false;

  /** Columna por la que se ordena. */
  public sortedColumn: string = '';

  /** Booleano que indica si se ordena de forma inversa. */
  public reverseSort: boolean = false;

  /** Evento que se lanza al ordenar. */
  @Output() public sortEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  /**
   * Obtiene el valor de un campo de un objeto.
   * @param item Item del que se quiere obtener el valor.
   * @param field Campo del que se quiere obtener el valor.
   * @returns Valor del campo.
   */
  public getFieldValue(item: any, field: string): any {
    const fields = field.split('.');
    let value = item;
    fields.forEach((field) => {
      value = value[field];
    });

    return value != null ? value : '--';
  }

  /**
   * Lanza el evento de ordenación.
   * @param column Columna por la que se ordena.
   */
  public sortData(column: string): void {
    if (this.sortedColumn === column) {
      // Si se ha pulsado sobre la misma columna
      this.reverseSort = !this.reverseSort; // Invierte el orden
    } else {
      // Si se ha pulsado sobre una columna diferente
      this.sortedColumn = column; // Establece la columna por la que se ordena
      this.reverseSort = false; // Establece el orden ascendente
    }
    const formattedColumn = this.sortedColumn.replace(/\./g, '__'); // Reemplaza los puntos por guiones bajos
    const sortEvent: SortEvent = {
      column: formattedColumn,
      order: this.reverseSort ? 'desc' : 'asc',
    };
    this.sortEvent.emit(sortEvent);
  }

  /**
   * Lanza el evento de eliminar.
   * @param id Id del elemento a eliminar.
   */
  public onDelete(id: number): void {
    this.onDeleteEvent.emit(id);
  }
}
