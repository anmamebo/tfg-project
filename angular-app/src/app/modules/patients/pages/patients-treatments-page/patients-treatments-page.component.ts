import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbPatientsTreatmentsData } from 'src/app/core/constants/breadcrumb-data.constants';

// Modelos
import { Patient } from 'src/app/core/models/patient.interface';

/**
 * Componente para la página de tratamientos de un paciente
 */
@Component({
  selector: 'app-patients-treatments-page',
  templateUrl: './patients-treatments-page.component.html',
})
export class PatientsTreatmentsPageComponent implements OnInit {
  /** Título de la página */
  public pageTitle: string = 'Tratamientos';

  /** Descripción de la página */
  public pageDescription: string =
    'Aquí puedes visualizar los tratamientos de un paciente.';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbPatientsTreatmentsData;

  /** Paciente que se visualizará */
  public patient: Patient | null = null;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.patient = this._route.snapshot.data['data']; // Obtiene los datos del paciente desde el resolver

    if (this.patient && this.patient.user) {
      this.pageTitle += ` - ${this.patient.user.name} ${this.patient.user.last_name}`;
    }
  }
}
