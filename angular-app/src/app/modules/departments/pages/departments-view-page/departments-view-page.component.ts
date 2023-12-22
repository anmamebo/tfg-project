import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbDepartmentsViewData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { DepartmentService } from 'src/app/core/services/entities/department.service';

// Modelos
import { Department } from 'src/app/core/models/department.interface';

/**
 * Componente para la página de visualización de un departamento
 */
@Component({
  selector: 'app-departments-view-page',
  templateUrl: './departments-view-page.component.html',
  providers: [DepartmentService],
})
export class DepartmentsViewPageComponent implements OnInit {
  /** Título de la página */
  public pageTitle: string = 'Visualizar departamento';

  /** Descripción de la página */
  public pageDescription: string = 'Aquí puedes visualizar un departamento.';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbDepartmentsViewData;

  /** Departamento que se visualizará */
  public department: Department | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.department = this._route.snapshot.data['data']; // Obtiene los datos del departamento desde el resolver
  }

  /**
   * Actualiza la información del departamento actual volviendo a obtener sus datos desde el servicio.
   * Si no hay departamento definido, no se realiza ninguna acción.
   * @returns {void}
   * @public
   */
  onRefreshDepartment(): void {
    if (!this.department) {
      return;
    }
    this._departmentService.getItemById(this.department.id).subscribe({
      next: (department: Department) => {
        this.department = department;
      },
    });
  }
}
