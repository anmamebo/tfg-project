import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbDepartmentsEditData } from 'src/app/core/constants/breadcrumb-data';

// Modelos
import { Department } from 'src/app/core/models/department.model';

/**
 * Componente para la página de edición de un departamento.
 */
@Component({
  selector: 'app-departments-edit-page',
  templateUrl: './departments-edit-page.component.html',
})
export class DepartmentsEditPageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Editar departamento';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes editar un departamento.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbDepartmentsEditData;

  /** Departamento a editar. */
  public department: Department | null = null;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.department = this._route.snapshot.data['data']; // Obtiene los datos del departamento desde el resolver
  }
}
