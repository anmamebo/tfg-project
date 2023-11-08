import { Component, OnInit } from '@angular/core';

// Servicios
import { PermissionService } from "src/app/core/services/permission.service";

// Modelos
import { Permission } from "src/app/core/models/permission.model";

@Component({
  selector: 'app-list-permission-card',
  templateUrl: './list-permission-card.component.html',
  styleUrls: ['./list-permission-card.component.scss'],
  providers: [PermissionService],
})
export class ListPermissionCardComponent implements OnInit {
  /**
   * Columnas que se mostrarán en la tabla
   */
  public columns: any[] = [
    { header: 'ID', field: 'id' },
    { header: 'NOMBRE', field: 'name' },
    { header: 'CÓDIGO', field: 'codename' },
    { header: 'MODELO RELACIONADO', field: 'content_type' },
  ]

  /**
   * Permisos que se mostrarán
   */
  public permissions: Permission[] | null = null;

  /**
   * Página actual
   */
  public page: number = 1;

  /**
   * Número de páginas totales
   */
  public totalPages: number = 1;

  /**
   * Número de grupos totales
   */
  public numGroups: number = 0;

  /**
   * Número de resultados por página
   */
  public numResults: number = 10;

  constructor(
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.getPermissions(this.page);
  }

  /**
   * Va a la página indicada
   * @param page Número de página al que se quiere ir
   */
  public goToPage(page: number) {
    this.page = page;
    this.getPermissions(this.page);
  }

  /**
   * Obtiene los permisos.
   * @param page Número de página que se quiere obtener.	
   */
  public getPermissions(page: number): void {
    this.permissionService.getPermissions(page).subscribe({
      next: (response: any) => {
        this.permissions = response.results;
        this.numGroups = response.count;
        this.totalPages = Math.ceil(this.numGroups / this.numResults);;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
