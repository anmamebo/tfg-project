import { Component, OnInit } from '@angular/core';

// Servicios
import { PermissionService } from "src/app/core/services/permission.service";

// Modelos
import { Permission } from "src/app/core/models/permission.model";


/**
 * Componente que representa una tarjeta de listado de permisos.
 */
@Component({
  selector: 'app-list-permission-card',
  templateUrl: './list-permission-card.component.html',
  styleUrls: ['./list-permission-card.component.scss'],
  providers: [PermissionService],
})
export class ListPermissionCardComponent implements OnInit {
  /** Título de la tarjeta */
  public titleCard: string = 'Listado de Permisos';

  /** Columnas que se mostrarán en la tabla */
  public columns: any[] = [
    { header: 'ID', field: 'id' },
    { header: 'NOMBRE', field: 'name' },
    { header: 'CÓDIGO', field: 'codename' },
    { header: 'MODELO RELACIONADO', field: 'content_type' },
  ]

  /** Permisos que se mostrarán */
  public permissions: Permission[] | null = null;

  /** Página actual */
  public page: number = 1;

  /** Número de páginas totales */
  public totalPages: number = 1;

  /** Número de grupos totales */
  public numGroups: number = 0;

  /** Número de resultados por página */
  public numResults: number = 10;

  /** Término de búsqueda */
  public search: string = '';
  
  constructor(
    private permissionService: PermissionService,
  ) {}

  ngOnInit(): void {
    this.getPermissions(this.page);
  }

  /**
   * Va a la página indicada
   * @param page Número de página al que se quiere ir
   */
  public goToPage(page: number): void {
    this.page = page;
    this.getPermissions(this.page);
  }

  /**
   * Lanza el evento de búsqueda
   * @param searchTerm Término de búsqueda
   */
  public onSearchSubmitted(searchTerm: string): void {
    this.getPermissions(this.page, searchTerm);
  }

  /**
   * Lanza el evento de cambio de número de resultados por página
   * @param elementsPerPage Número de resultados por página
   */
  public onEntriesPerPageChanged(elementsPerPage: number): void {
    this.numResults = elementsPerPage;
    this.getPermissions(this.page);
  }

  /**
   * Obtiene el listado de permisos
   * @param page Página a la que se quiere ir
   * @param searchTerm Término de búsqueda
   */
  public getPermissions(page: number, searchTerm?: string): void {
    // Comprueba si el término de búsqueda ha cambiado
    if (searchTerm != undefined && searchTerm != this.search) {      
      this.search = searchTerm ? searchTerm : '';
      page = 1;
      this.page = 1;
    } 

    this.permissionService.getPermissions(page, this.numResults, this.search).subscribe({
      next: (response: any) => {
        this.permissions = response.results;
        this.numGroups = response.count;
        this.totalPages = Math.ceil(this.numGroups / this.numResults);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
