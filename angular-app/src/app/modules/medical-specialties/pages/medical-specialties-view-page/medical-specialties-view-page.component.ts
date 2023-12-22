import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbMedicalSpecialtiesViewData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { MedicalspecialtyService } from 'src/app/core/services/entities/medicalspecialty.service';

// Modelos
import { MedicalSpecialty } from 'src/app/core/models/medical-specialty.interface';

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
