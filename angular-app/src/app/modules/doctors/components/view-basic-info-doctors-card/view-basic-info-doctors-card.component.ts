import { Component, Input } from '@angular/core';

// Modelos
import { Doctor } from 'src/app/core/models/doctor.interface';

/**
 * Componente que representa la tarjeta de visualización de la
 * información básica de un médico
 */
@Component({
  selector: 'app-view-basic-info-doctors-card',
  templateUrl: './view-basic-info-doctors-card.component.html',
})
export class ViewBasicInfoDoctorsCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Información Básica';

  /** Médico que se visualizará */
  @Input() public doctor: Doctor | null = null;

  /** Columnas que se mostrarán en la tabla. */
  public columnsMedicalSpecialty: any[] = [{ header: '', field: 'name' }];

  /** Columnas que se mostrarán en la tabla. */
  public columnsDepartment: any[] = [{ header: '', field: 'name' }];

  constructor() {}
}
