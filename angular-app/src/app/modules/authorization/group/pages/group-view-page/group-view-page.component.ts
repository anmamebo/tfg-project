import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbGroupViewData } from "src/app/core/constants/breadcrumb-data";

// Modelos
import { Group } from "src/app/core/models/group.model";

// Servicios
import { GroupService } from "src/app/core/services/group.service";

/**
 * Componente para la página de visualización de un grupo
 */
@Component({
  selector: 'app-group-view-page',
  templateUrl: './group-view-page.component.html',
  styleUrls: ['./group-view-page.component.scss'],
  providers: [GroupService]
})
export class GroupViewPageComponent implements OnInit {
  /**
   * Título de la página
   */
  public pageTitle: string = 'Visualizar grupo';

  /**
   * Descripción de la página
   */
  public pageDescription: string = 'Aquí puedes visualizar un grupo (rol).';

  /**
   * Datos para el breadcrumb
   */
  public breadcrumbData = breadcrumbGroupViewData;

  /**
   * Grupo que se visualizará
   */
  public group: Group | null = null;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      
      this.getProduct(id);
    });
  }

  /**
   * Obtiene un grupo por su id
   * @param id Id del grupo
   */
  getProduct(id: number) {
    this.groupService.getGroupById(id).subscribe({
      next: (group: Group) => {
        this.group = group;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
