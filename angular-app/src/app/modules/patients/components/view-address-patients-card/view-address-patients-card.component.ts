import { Component, Input } from '@angular/core';

// Modelos
import { Address } from 'src/app/core/models/address.model';

/**
 * Componente que representa la tarjeta de visualización de la
 * dirección de un paciente
 */
@Component({
  selector: 'app-view-address-patients-card',
  templateUrl: './view-address-patients-card.component.html',
  styleUrls: ['./view-address-patients-card.component.scss'],
})
export class ViewAddressPatientsCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Dirección';

  /** Dirección que se visualizará */
  @Input() public address: Address | null = null;

  constructor() {}
}
