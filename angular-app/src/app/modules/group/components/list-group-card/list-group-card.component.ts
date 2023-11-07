import { Component, OnInit } from '@angular/core';

// Servicios
import { GroupService } from "src/app/core/services/group.service";

// Modelos
import { Group } from "src/app/core/models/group.model";

/**
 * Componente que representa la tarjeta del listado de grupos
 */
@Component({
  selector: 'app-list-group-card',
  templateUrl: './list-group-card.component.html',
  styleUrls: ['./list-group-card.component.scss'],
  providers: [GroupService],
})
export class ListGroupCardComponent implements OnInit {
  /**
   * Columnas que se mostrarán en la tabla
   */
  public columns: any[] = [
    { header: 'ID', field: 'id' },  
    { header: 'NOMBRE', field: 'name' },  
  ]
  
  /**
   * Grupos que se mostrarán
   */
  public groups: Group[] | null = null;

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
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.getGroups(this.page);
  }

  /**
   * Va a la página indicada
   * @param page Número de página al que se quiere ir
   */
  public goToPage(page: number) {
    this.page = page;
    this.getGroups(this.page);
  }

  /**
   * Obtiene la lista de grupos y la asigna a la propiedad 'groups'.
   */
  public getGroups(page: number): void {
    this.groupService.getGroups(page).subscribe({
      next: (groups: any) => {
        this.groups = groups.results;
        this.numGroups = groups.count;
        this.totalPages = Math.ceil(this.numGroups / this.numResults);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

}
