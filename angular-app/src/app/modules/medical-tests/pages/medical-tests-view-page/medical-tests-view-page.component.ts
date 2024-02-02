import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbMedicalTestsViewData } from 'src/app/core/constants/breadcrumb-data';

// Servicios
import { MedicalTestService } from 'src/app/core/services/entities/medicaltest.service';

// Modelos
import { MedicalTest } from 'src/app/core/models/medical-test.interface';

/**
 * Componente para la página de visualización de una prueba médica
 */
@Component({
  selector: 'app-medical-tests-view-page',
  templateUrl: './medical-tests-view-page.component.html',
  providers: [MedicalTestService],
})
export class MedicalTestsViewPageComponent {
  /** Título de la página */
  public pageTitle: string = 'Visualizar Prueba Médica';

  /** Descripción de la página */
  public pageDescription: string = 'Aquí puedes visualizar una prueba médica.';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbMedicalTestsViewData;

  /** Prueba médica que se visualizará */
  public medicalTest: MedicalTest | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _medicalTestService: MedicalTestService
  ) {
    this.medicalTest = this._route.snapshot.data['data']; // Obtiene los datos de la prueba médica

    this._generatePageTitle();
  }

  /**
   * Genera el título de la página.
   * @returns {void}
   * @private
   */
  private _generatePageTitle(): void {
    if (
      this.medicalTest &&
      this.medicalTest.patient &&
      this.medicalTest.patient.user
    ) {
      const name = this.medicalTest.name ?? '';

      const formattedDate = this.medicalTest.date_prescribed
        ? new Date(this.medicalTest.date_prescribed).toLocaleString()
        : '';

      const patientName = this.medicalTest.patient.user.name ?? '';
      const patientLastName = this.medicalTest.patient.user.last_name ?? '';

      this.pageTitle = `${name} - ${patientName} ${patientLastName} - (${formattedDate})`;
    }
  }

  /**
   * Obtiene la información de la prueba médica.
   * @returns {void}
   * @public
   */
  public getMedicalTest(): void {
    if (!this.medicalTest) return;

    this._medicalTestService.getMedicalTestById(this.medicalTest.id).subscribe({
      next: (response: any) => {
        this.medicalTest = response;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
