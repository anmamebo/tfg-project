import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * Componente genérico para páginas.
 */
@Component({
  selector: 'app-generic-page',
  templateUrl: './generic-page.component.html',
})
export class GenericPageComponent {
  /** Título de la página. */
  @Input() pageTitle: string = 'Título';

  /** Descripción de la página. */
  @Input() pageDescription: string = 'Descripción';

  /** Datos para el componente `app-breadcrumb`. */
  @Input() breadcrumbData: any;

  constructor(private _location: Location) {}

  /**
   * Navega hacia atrás en el historial del navegador.
   * @public
   * @returns {void}
   */
  public goBack(): void {
    this._location.back();
  }
}
