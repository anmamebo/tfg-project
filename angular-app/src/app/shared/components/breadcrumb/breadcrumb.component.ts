import { Component, Input } from '@angular/core';

/**
 * Componente que representa un breadcrumb.
 */
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  /** Array de breadcrumbs con formato { label: string, url: string } */
  @Input() public breadcrumbs: any[] | null = null;

  /** Booleano que indica si el breadcrumb último está activo. */
  @Input() public isLastActive: boolean = false;

  constructor() {}
}
