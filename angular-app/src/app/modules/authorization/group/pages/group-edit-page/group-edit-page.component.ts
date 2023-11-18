import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { breadcrumbGroupEditData } from "src/app/core/constants/breadcrumb-data";

// Modelos
import { Group } from "src/app/core/models/group.model";

// Servicios
import { GroupService } from "src/app/core/services/group.service";


/**
 * Componente para la página de edición de un grupo.
 */
@Component({
  selector: 'app-group-edit-page',
  templateUrl: './group-edit-page.component.html',
  styleUrls: ['./group-edit-page.component.scss'],
  providers: [GroupService]
})
export class GroupEditPageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Editar grupo';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes editar un grupo (rol).';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbGroupEditData;

  /** Grupo a editar. */
  public group: Group | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      
      this.getGroup(id);
    });
  }

  /**
   * Obtiene un grupo por su `id`.
   * @param id `id` del grupo a obtener.
   */
  getGroup(id: number): void {
    this.groupService.getGroupById(id).subscribe({
      next: (group: Group) => {
        this.group = group;
      },
      error: (error: any) => {
        if (error.status === 404) {
          this.router.navigate(['**'], { replaceUrl: true }); 
        } else {
          console.error(error);
        }
      }
    });
  }
}
