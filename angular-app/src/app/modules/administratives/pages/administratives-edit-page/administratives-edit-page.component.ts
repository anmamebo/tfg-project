import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbAdministrativesEditData } from 'src/app/core/constants/breadcrumb-data.constants';

// Servicios
import { AdministrativeService } from 'src/app/core/services/entities/administrative.service';

// Modelos
import { User } from 'src/app/core/models/user.interface';

/**
 * Componente para la página de edición de un administrativo.
 */
@Component({
  selector: 'app-administratives-edit-page',
  templateUrl: './administratives-edit-page.component.html',
  providers: [AdministrativeService],
})
export class AdministrativesEditPageComponent implements OnInit {
  /** Título de la página. */
  public pageTitle: string = 'Editar';

  /** Descripción de la página. */
  public pageDescription: string = 'Aquí puedes editar un administrativo.';

  /** Datos para el componente `app-breadcrumb`. */
  public breadcrumbData = breadcrumbAdministrativesEditData;

  /** Administrativo a editar. */
  public administrative: User | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _administrativeService: AdministrativeService
  ) {}

  ngOnInit(): void {
    this.administrative = this._route.snapshot.data['data']; // Obtiene los datos del administrativo desde el resolver

    if (this.administrative) {
      this.pageTitle += ` - ${this.administrative.name} ${this.administrative.last_name}`;
    }
  }

  /**
   * Actualiza la información del administrativo actual volviendo a obtener sus datos desde el servicio.
   * Si no hay administrativo definido, no se realiza ninguna acción.
   * @returns {void}
   * @public
   */
  public onRefreshAdministrative(): void {
    if (!this.administrative) {
      return;
    }
    this._administrativeService.getItemById(this.administrative.id).subscribe({
      next: (administrative: User) => {
        this.administrative = administrative;
        this._refreshTitle();
      },
    });
  }

  /**
   * Actualiza el título de la página con el nombre y apellido del administrativo.
   * @returns {void}
   * @private
   */
  private _refreshTitle(): void {
    if (this.administrative) {
      this.pageTitle = `Editar - ${this.administrative.name} ${this.administrative.last_name}`;
    }
  }
}
