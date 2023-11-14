import { Component, Input } from '@angular/core';

// Modelos
import { Group } from "src/app/core/models/group.model";


/**
 * Componente que representa la tarjeta de visualización de un grupo
 */
@Component({
  selector: 'app-view-group-card',
  templateUrl: './view-group-card.component.html',
  styleUrls: ['./view-group-card.component.scss']
})
export class ViewGroupCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Ver Grupo';

  /** Grupo que se visualizará */
  @Input() public group: Group | null = null;

  /** Columnas que se visualizarán en la tabla de permisos asignados al grupo */
  public columns: any[] = [
    { header: 'ID', field: 'id' },  
    { header: 'NOMBRE', field: 'name' },  
    { header: 'MODELO RELACIONADO', field: 'content_type' },  
  ]

  constructor() { }
}
