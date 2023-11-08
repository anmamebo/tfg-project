import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {
  /**
   * Array de columnas con formato { header: string, field: string }
   */
  @Input() public columns: any[] | null = null;
  
  /**
   * Array de datos a mostrar en la tabla.
   */
  @Input() public data: any[] | null = null;

  /**
   * Booleano que indica si se muestran las acciones en la tabla.
   */
  @Input() public actions: boolean = false;

  /**
   * Objeto con las urls de las acciones.
   */
  @Input() public actionsUrls: any = {}

  constructor() { }
}
