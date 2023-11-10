import { Component, Input } from '@angular/core';

/**
 * Componente genérico para páginas.
 */
@Component({
  selector: 'app-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss']
})
export class GenericPageComponent {
  /**
   * Título de la página.
   */
  @Input() pageTitle: string = 'Título';

  /**
   * Descripción de la página.
   */
  @Input() pageDescription: string = 'Descripción';

  /**
   * Datos para el componente `app-breadcrumb`.
   */
  @Input() breadcrumbData: any;
}
