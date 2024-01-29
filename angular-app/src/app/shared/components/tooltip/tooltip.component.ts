import { Component } from '@angular/core';

/**
 * Componente que muestra un tooltip
 */
@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  /** Texto que será mostrado en el tooltip */
  public tooltip: string = '';

  /** Posición del tooltip */
  public left: number = 0;

  /** Posición del tooltip */
  public top: number = 0;
}
