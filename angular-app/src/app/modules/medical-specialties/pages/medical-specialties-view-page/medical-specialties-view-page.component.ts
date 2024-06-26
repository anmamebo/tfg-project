import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { breadcrumbMedicalSpecialtiesViewData } from '@app/core/constants/breadcrumb-data.constants';
import { ROLES } from '@app/core/constants/roles.constants';
import { MedicalSpecialty } from '@app/core/models/medical-specialty.interface';
import { MedicalspecialtyService } from '@app/core/services/entities/medicalspecialty.service';

/**
 * Componente para la página de visualización de una especialidad médica
 */
@Component({
  selector: 'app-medical-specialties-view-page',
  templateUrl: './medical-specialties-view-page.component.html',
})
export class MedicalSpecialtiesViewPageComponent implements OnInit {
  /** Título de la página */
  public pageTitle: string = 'Visualizar especialidad médica';

  /** Descripción de la página */
  public pageDescription: string =
    'Aquí puedes visualizar una especialidad médica.';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbMedicalSpecialtiesViewData;

  /** Roles que pueden visualizar los botones de acciones */
  public buttonsRoles: string[] = [ROLES.ADMIN];

  /** Especialidad médica que se visualizará */
  public medicalSpecialty: MedicalSpecialty | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _medicalSpecialtyService: MedicalspecialtyService
  ) {}

  ngOnInit(): void {
    this.medicalSpecialty = this._route.snapshot.data['data']; // Obtiene los datos de la especialidad médica desde el resolver
  }

  /**
   * Actualiza la información de la especialidad médica actual volviendo a obtener sus datos desde el servicio.
   * Si no hay una especialidad médica definida, no se realiza ninguna acción.
   * @returns {void}
   * @public
   */
  onRefreshMedicalSpecialty(): void {
    if (!this.medicalSpecialty) return;

    this._medicalSpecialtyService
      .getItemById(this.medicalSpecialty.id)
      .subscribe({
        next: (medicalSpecialty: MedicalSpecialty) => {
          this.medicalSpecialty = medicalSpecialty;
        },
      });
  }
}
