import { Component, OnInit } from '@angular/core';

import { breadcrumbPermissionData } from "src/app/core/constants/breadcrumb-data";


/**
 * Componente para la página de permisos.
 */
@Component({
  selector: 'app-permission-page',
  templateUrl: './permission-page.component.html',
  styleUrls: ['./permission-page.component.scss']
})
export class PermissionPageComponent implements OnInit {
  /**
   * Título de la página.
   */
  public pageTitle: string = 'Permisos';

  /**
   * Descripción de la página.
   */
  public pageDescription: string = 'Aquí puedes ver los diferentes permisos.';

  /**
   * Datos para el componente `app-breadcrumb`.
   */
  public breadcrumbData = breadcrumbPermissionData;

  constructor() { }

  ngOnInit(): void {
  }

}
