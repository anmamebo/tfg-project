import { Component, Input } from '@angular/core';
import { Department } from '@app/core/models/department.interface';

/**
 * Componente que representa la tarjeta de visualización de la
 * información básica de un departamento
 */
@Component({
  selector: 'app-view-info-departments-card',
  templateUrl: './view-info-departments-card.component.html',
})
export class ViewInfoDepartmentsCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Departamento que se visualizará */
  @Input() public department: Department | null = null;

  constructor() {}
}
