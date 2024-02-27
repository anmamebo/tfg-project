import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { breadcrumbPatientsMedicalTestsData } from '@app/core/constants/breadcrumb-data.constants';
import { Patient } from '@app/core/models/patient.interface';

/**
 * Componente para la página de pruebas médicas de un paciente
 */
@Component({
  selector: 'app-patients-medical-tests-page',
  templateUrl: './patients-medical-tests-page.component.html',
})
export class PatientsMedicalTestsPageComponent implements OnInit {
  /** Título de la página */
  public pageTitle: string = 'Pruebas médicas';

  /** Descripción de la página */
  public pageDescription: string =
    'Aquí puedes visualizar las pruebas médicas de un paciente.';

  /** Datos para el breadcrumb */
  public breadcrumbData = breadcrumbPatientsMedicalTestsData;

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
