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
   * Emite el evento onDeleteEvent.
   */
  public onDelete(id: number): void {
    this.onDeleteEvent.emit(id);
  }
}
