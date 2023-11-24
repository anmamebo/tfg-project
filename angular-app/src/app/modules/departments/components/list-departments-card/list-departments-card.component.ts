import { Component, OnInit } from '@angular/core';

// Servicios
import { DepartmentService } from "src/app/core/services/department.service";
import { NotificationService } from "src/app/core/services/notification.service";

// Modelos
import { Department } from 'src/app/core/models/department.model';


/**
 * Componente que representa una tarjeta de listado de departamentos.
 */
@Component({
  selector: 'app-list-departments-card',
  templateUrl: './list-departments-card.component.html',
  styleUrls: ['./list-departments-card.component.scss']
})
export class ListDepartmentsCardComponent implements OnInit {
  /** Título de la tarjeta. */
  public titleCard: string = 'Listado de Departamentos';

  /** Columnas que se mostrarán en la tabla. */
  public columns: any[] = [
    { header: 'ID', field: 'id' },
    { header: 'NOMBRE', field: 'name' },
    { header: 'DESCRIPCIÓN', field: 'description' },
  ]

  /** Departamentos que se mostrarán. */
  public departments: Department[] | null = null;

  /** Página actual. */
  public page: number = 1;

  /** Número de páginas totales. */
  public totalPages: number = 1;

  /** Número de departamentos totales. */
  public numDepartments: number = 0;

  /** Número de resultados por página. */
  public numResults: number = 10;

  /** Objeto con las urls de las acciones. */
  public actionsUrls = { 
    show: '/departamentos',
    edit: '/departamentos/editar',
    delete: ''
  }

  /** Término de búsqueda. */
  public search: string = '';

  constructor(
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getDepartments(this.page);
  }

  /**
   * Navega a la página indicada.
   * @param page Número de página.
   */
  public goToPage(page: number): void {
    this.page = page;
    this.getDepartments(this.page);
  }

  /**
   * Lanza el evento de búsqueda.
   * @param searchTerm Término de búsqueda.
   */
  public onSearchSubmitted(searchTerm: string): void {
    this.getDepartments(this.page, searchTerm);
  }

  /**
   * Lanza el evento de cambio de número de resultados por página.
   * @param elementsPerPage Número de resultados por página.
   */
  public onEntriesPerPageChanged(elementsPerPage: number): void {
    this.numResults = elementsPerPage;
    this.page = 1;
    this.getDepartments(this.page);
  }

  /**
   * Obtiene los departamentos.
   * @param page Página actual.
   * @param searchTerm Término de búsqueda.
   */
  public getDepartments(page: number, searchTerm?: string): void {
    // Comprueba si el término de búsqueda ha cambiado
    if (searchTerm != undefined && searchTerm != this.search) {      
      this.search = searchTerm ? searchTerm : '';
      page = 1;
      this.page = 1;
    }

    this.departmentService.getDepartmentsPaginate(page, this.numResults, this.search).subscribe({
      next: (response: any) => {
        this.departments = response.results;
        this.numDepartments = response.count;
        this.totalPages = Math.ceil(this.numDepartments / this.numResults);
      },
      error: (error: any) => {
        this.notificationService.showErrorToast(error.message);
      }
    })
  }

  /**
   * Elimina un departamento.
   * @param id Identificador del departamento.
   */
  public deleteDepartment(id: string): void {
    this.notificationService.showConfirmDeleteDialog(() => {

      this.departmentService.deleteDepartment(id).subscribe({
        next: () => {
          this.getDepartments(this.page);
        },
        error: (error: any) => {
          this.notificationService.showErrorToast('No se ha podido eliminar el departamento.');
        }
      });
    });
  }

}
