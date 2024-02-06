import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { breadcrumbPatientsMedicalHistoryData } from 'src/app/core/constants/breadcrumb-data.constants';
import { Patient } from 'src/app/core/models/patient.interface';

/**
 * Componente para la página de historial médico de un paciente
 */
@Component({
  selector: 'app-patients-medical-history-page',
  templateUrl: './patients-medical-history-page.component.html',
})
export class PatientsMedicalHistoryPageComponent implements OnInit {
  /** Título de la página */
  public pageTitle: string = 'Historial médico';

  /** Descripción de la página */
  public pageDescription: string =
    'Aquí puedes visualizar el historial médico de un paciente.';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbPatientsMedicalHistoryData;

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
