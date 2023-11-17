import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Componente que representa una tabla genérica.
 */
@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {
  /** Array de columnas con formato { header: string, field: string } */
  @Input() public columns: any[] | null = null;
  
  /** Array de datos a mostrar en la tabla. */
  @Input() public data: any[] | null = null;

  /** Booleano que indica si se muestran las acciones en la tabla. */
  @Input() public actions: boolean = false;

  /** Objeto con las urls de las acciones. */
  @Input() public actionsUrls: any = {}

  /** Evento que se lanza al pulsar el botón de eliminar. */
  @Output() public onDeleteEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  /**
   * Obtiene el valor de un campo de un objeto.
   * @param item Item del que se quiere obtener el valor.
   * @param field Campo del que se quiere obtener el valor.
   * @returns Valor del campo.
   */
  public getFieldValue(item: any, field: string): any {
    const fields = field.split('.');
    let value = item;
    fields.forEach(field => {
      value = value[field];
    });
    return value;
  }

  /**
   * Emite el evento onDeleteEvent.
   */
  public onDelete(id: number): void {
    this.onDeleteEvent.emit(id);
  }
}
