import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortEvent } from '@app/core/models/sort-event.interface';

interface ActionsUrls {
  show?: {
    url: string;
    roles: string[];
  };
  edit?: {
    url: string;
    roles: string[];
  };
  delete?: {
    roles: string[];
  };
}

/**
 * Componente que representa una tabla genérica.
 */
@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
})
export class GenericTableComponent {
  /** Array de columnas con formato { header: string, field: string } */
  @Input() public columns: any[] | null = null;

  /** Array de datos a mostrar en la tabla. */
  @Input() public data: any[] | null = null;

  /** Booleano que indica si se muestran las acciones en la tabla. */
  @Input() public actions: boolean = false;

  /** Objeto con las urls de las acciones. */
  @Input() public actionsUrls: ActionsUrls | undefined = {
    show: {
      url: '',
      roles: [],
    },
    edit: {
      url: '',
      roles: [],
    },
    delete: {
      roles: [],
    },
  };

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
   * Obtiene el valor de un campo específico dentro de un objeto.
   * @public
   * @param {any} item - El objeto del que se obtendrá el valor del campo.
   * @param {string} field - El nombre del campo a obtener, puede ser anidado (ej. "campo.anidado.valor").
   * @returns {any} El valor del campo solicitado, o '--' si el valor es nulo o indefinido.
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
   * Ordena los datos según la columna especificada.
   * Si se selecciona la misma columna, invierte el orden de clasificación.
   * @public
   * @param {string} column - El nombre de la columna por la que se ordenarán los datos.
   * @returns {void}
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
   * Emite un evento para eliminar un elemento con el ID especificado.
   * @public
   * @param {number} id - El ID del elemento que se eliminará.
   * @returns {void}
   */
  public onDelete(id: number): void {
    this.onDeleteEvent.emit(id);
  }
}
