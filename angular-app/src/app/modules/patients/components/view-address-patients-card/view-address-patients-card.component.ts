import { Component, Input } from '@angular/core';
import { Address } from '@app/core/models/address.interface';

/**
 * Componente que representa la tarjeta de visualización de la
 * dirección de un paciente
 */
@Component({
  selector: 'app-view-address-patients-card',
  templateUrl: './view-address-patients-card.component.html',
})
export class ViewAddressPatientsCardComponent {
  /** Título de la tarjeta */
  public titleCard: string = 'Dirección';

  /** Dirección que se visualizará */
  @Input() public address: Address | null = null;

  constructor() {}
}
