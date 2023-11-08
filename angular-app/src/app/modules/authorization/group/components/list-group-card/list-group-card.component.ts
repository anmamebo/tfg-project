import { Component, OnInit } from '@angular/core';

// Servicios
import { GroupService } from "src/app/core/services/group.service";
import { NotificationService } from "src/app/core/services/notification.service";

// Modelos
import { Group } from "src/app/core/models/group.model";

/**
 * Componente que representa la tarjeta del listado de grupos
 */
@Component({
  selector: 'app-list-group-card',
  templateUrl: './list-group-card.component.html',
  styleUrls: ['./list-group-card.component.scss'],
  providers: [GroupService, NotificationService],
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

  /**
   * Objeto con las urls de las acciones.
   */
  public actionsUrls = { 
    show: '/autorizacion/grupos',
    edit: '/autorizacion/grupos/editar',
    delete: ''
  }

  constructor(
    private groupService: GroupService,
    private notificationService: NotificationService
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
   * Obtiene los grupos
   * @param page Número de página que se quiere obtener
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

  /**
   * Elimina un grupo
   * @param id ID del grupo que se quiere eliminar
   */
  public deleteGroup(id: number): void {
    this.notificationService.showConfirmDeleteDialog(() => {

      this.groupService.deleteGroup(id).subscribe({
        next: (response) => {
          this.getGroups(this.page); 
        },
        error: (error) => {
          console.error(error);
        },
      }); 

    });
  }

}
