import { Component, Input } from '@angular/core';

// Modelos
import { Department } from 'src/app/core/models/department.model';

/**
 * Componente que representa la tarjeta de visualización de la
 * información básica de un departamento
 */
@Component({
  selector: 'app-view-info-departments-card',
  templateUrl: './view-info-departments-card.component.html',
  styleUrls: ['./view-info-departments-card.component.scss'],
})
export class ViewInfoDepartmentsCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Departamento que se visualizará */
  @Input() public department: Department | null = null;

  constructor() {}
}
