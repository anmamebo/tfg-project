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

  constructor(private location: Location) {}

  /**
   * Regresa a la página anterior.
   */
  public goBack(): void {
    this.location.back();
  }
}
