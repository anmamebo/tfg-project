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
   * Grupos que se mostrarán
   */
  public groups: Group[] | null = null;

  /**
   * Columnas que se mostrarán en la tabla
   */
  public columns: any[] = [
    { header: 'ID', field: 'id' },  
    { header: 'NOMBRE', field: 'name' },  
  ]

  constructor(
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.getGroups();
  }

  /**
   * Obtiene la lista de grupos y la asigna a la propiedad 'groups'.
   */
  public getGroups(): void {
    this.groupService.getGroups().subscribe({
      next: (groups: Group[]) => {
        this.groups = groups;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

}
