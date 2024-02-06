import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { breadcrumbAdministrativesViewData } from 'src/app/core/constants/breadcrumb-data.constants';
import { User } from 'src/app/core/models/user.interface';
import { AdministrativeService } from 'src/app/core/services/entities/administrative.service';

/**
 * Componente para la página de visualización de un administrativo
 */
@Component({
  selector: 'app-administratives-view-page',
  templateUrl: './administratives-view-page.component.html',
  providers: [AdministrativeService],
})
export class AdministrativesViewPageComponent {
  /** Título de la página */
  public pageTitle: string = 'Visualizar';

  /** Descripción de la página */
  public pageDescription: string = 'Aquí puedes visualizar un administrativo.';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbAdministrativesViewData;

  /** Administrativo que se visualizará */
  public administrative: User | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _administrativeService: AdministrativeService
  ) {
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
  onRefreshAdministrative(): void {
    if (!this.administrative) return;

    this._administrativeService.getItemById(this.administrative.id).subscribe({
      next: (administrative: User) => {
        this.administrative = administrative;
      },
    });
  }
}
