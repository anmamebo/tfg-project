import { Component, Input } from '@angular/core';
import { Doctor } from '@app/core/models/doctor.interface';

/**
 * Componente que representa la tarjeta de visualización de la
 * información de contacto de un médico
 */
@Component({
  selector: 'app-view-contact-info-doctors-card',
  templateUrl: './view-contact-info-doctors-card.component.html',
})
export class ViewContactInfoDoctorsCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Información de Contacto';

  /** Médico que se visualizará */
  @Input() public doctor: Doctor | null = null;

  constructor() {}
}
